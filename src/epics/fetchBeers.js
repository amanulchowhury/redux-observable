import {
    map, switchMap, 
    debounceTime, filter, 
    catchError, delay, takeUntil, mapTo, withLatestFrom, pluck
} from 'rxjs/operators';
import { 
    fetchFulfilled, setStatus, SEARCH, fetchFailed, CANCEL, reset 
} from '../reducers/beersActions';
import { ofType } from 'redux-observable';
import { concat, of, fromEvent, merge, race } from 'rxjs';

const search = (apiBase, perPage, term) => 
    `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;

export function fetchBeers(action$, state$, { getJSON, document }) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ''),
        withLatestFrom(
            state$.pipe(pluck('config'))
        ),
        switchMap(([{payload}, config]) => {
            const ajax$ = getJSON(search(config.apiBase, config.perPage, payload)).pipe(
                map(resp => fetchFulfilled(resp)),
                catchError(err => {
                    return of(fetchFailed(err.response.message));
                })
            );

            const blocker$ = merge(
                action$.pipe(ofType(CANCEL)),
                fromEvent(document, 'keyup').pipe(
                    filter((evt) => {
                        return evt.key === 'Escape' || evt.key === 'Esc'
                    })
                )
            ).pipe(
                mapTo(reset())
            );
            return concat(
                of(setStatus('pending')),
                race(ajax$, blocker$)
            )
        })
    )
}


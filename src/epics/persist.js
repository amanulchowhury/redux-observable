import { ofType } from "redux-observable";
import { SET_CONFIG, setConfig } from "../reducers/configActions";
import { withLatestFrom, tap, ignoreElements, pluck } from "rxjs/operators";
import { of, EMPTY } from "rxjs";

const CACHE_KEY = 'ro-config';

export function persistEpic(action$, state$) {
    return action$.pipe(
        ofType(SET_CONFIG),
        withLatestFrom(state$.pipe(pluck('config'))),
        tap(([action, config]) => {
            localStorage.setItem(CACHE_KEY, JSON.stringify(config));
        }),
        ignoreElements()
    )
}

export function hydrateEpic() {
    const maybeConfig = localStorage.getItem(CACHE_KEY);

    if (typeof maybeConfig === 'string') {
        try {
            const parsed = JSON.parse(maybeConfig);
            return of(setConfig(parsed));
        } catch (e) {
            return EMPTY;
        }
    }

    return EMPTY;
}
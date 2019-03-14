import {FETCH_FULFILLED, SET_STATUS, FETCH_FAILED, RESET} from './beersActions';

export const initialState = {
    data: [],
    loading: 'idle' // 'idle' | 'pending' | 'success' | 'failure'
}

export function beersReducer(state = initialState, action) {
    switch(action.type) {
        case SET_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case FETCH_FULFILLED: {
            return {
                ...state,
                status: 'success',
                data: action.payload,
                messages: []
            }
        }
        case RESET: {
            return {
                ...state,
                status: 'idle',
                messages: []
            }
        }
        case FETCH_FAILED: {
            return {
                ...state,
                status: 'failure',
                messages: [{
                    type: 'error',
                    text: action.payload
                }]
            }
        }
        default:
            return state;
    }
}
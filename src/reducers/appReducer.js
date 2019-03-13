export function appReducer(state = { name: 'Amanul' }, action) {
    switch(action.type) {
        case 'SET_NAME': 
            return { ...state, name: action.payload };
        default:
            return state;
    }
}
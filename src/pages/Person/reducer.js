
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'Person_SET_STATE':
            const newState = { ...state, ...action.data }
            return newState
            break;
        default:
            return state
    }
}
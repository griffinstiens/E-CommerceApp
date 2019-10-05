//a reducer is a function that gets two properties - a state object, which represents the last state or initial state
//then it receives an action, an object that has a type and payload
//the state will be what it is currently when action is fired


const INITIAL_STATE = {
    currentUser: null
}

//if state is ever undefined, it will fallback to INITIAL_STATE value
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
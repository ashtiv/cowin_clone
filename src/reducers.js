import { UPDATE_USER_DATA } from './actions';

const initialState = {
    uid: null,
    phoneNumber: ''
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_DATA:
            return {
                ...state,
                uid: action.payload.uid,
                phoneNumber: action.payload.phoneNumber
            };
        default:
            return state;
    }
}

export default rootReducer;
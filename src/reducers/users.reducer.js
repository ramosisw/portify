import { userConstants } from '../constants';
const defaultState = {
    display_name: "User Name"
};
export const users = (state = defaultState, action) => {
    switch (action.type) {
        case userConstants.GET_PROFILE_SUCCESS:
            return {
                ...action.data
            };
        default: return state;
    }
}
import { userConstants } from '../constants';
import { spotifyService } from '../services';
import { alertActions } from './alert.actions';

const getMe = () => {
    console.log("action.getMe");
    return dispatch => {
        dispatch(request());
        spotifyService.getMe().then(data => {
            console.log("dispatch(success(data));");
            dispatch(success(data));
        }, error => {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        });
    };

    function request() { return { type: userConstants.GET_PROFILE_REQUEST } }
    function success(data) { return { type: userConstants.GET_PROFILE_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GET_PROFILE_FAILURE, error } }
}


export const userActions = {
    getMe
};
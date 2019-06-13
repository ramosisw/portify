import { userConstants } from '../constants';
import { spotifyService, appService } from '../services';
import { alertActions } from './alert.actions';

const getMe = () => {
    return dispatch => {
        dispatch(request());
        spotifyService.getMe().then(data => {
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

const exportData = () => {
    return dispatch => {
        dispatch(request());
        appService.exportData().then(data => {
            dispatch(success(data));
            appService.downloadJson(`${data.user_id}_v${data.version}.json`, JSON.stringify(data, null, 4));
        }, error => {
            dispatch(failure(error));
        });
    };

    function request() { return { type: userConstants.EXPORT_REQUEST } }
    function success(data) { return { type: userConstants.EXPORT_SUCCESS, data } }
    function failure(error) { return { type: userConstants.EXPORT_FAILURE, error } }
};


export const userActions = {
    getMe,
    exportData
};
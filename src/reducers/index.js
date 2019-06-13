import { combineReducers } from 'redux';
import { user } from './users.reducer';
import { alert } from './alert.reducer';


const rootReducer = combineReducers({
    alert,
    user
});

export default rootReducer;
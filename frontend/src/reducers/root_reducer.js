import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errors from './errors_reducer';
import tweets from './tweets_reducer';

const RootReducer = combineReducers({
    session: sessionReducer,
    errors,
    tweets
});

export default RootReducer;
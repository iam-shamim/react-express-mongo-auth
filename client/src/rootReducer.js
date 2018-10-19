import { combineReducers } from 'redux';
import flashMessages from "./store/reducers/flashMessages";
import auth from './store/reducers/auth';
import setup from './store/reducers/setup';

export default  combineReducers(( {
    flashMessages,
    auth,
    setup,
}))
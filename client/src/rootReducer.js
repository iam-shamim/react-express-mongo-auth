import { combineReducers } from 'redux';
import flashMessages from "./store/reducers/flashMessages";
import auth from './store/reducers/auth';

export default  combineReducers(( {
    flashMessages,
    auth
}))
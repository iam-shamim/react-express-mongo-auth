import { combineReducers } from 'redux';
import flashMessages from "./store/reducers/flashMessages";
//import auth from './reducers/auth';

export default  combineReducers(( {
    flashMessages
}))
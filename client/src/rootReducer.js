import { combineReducers } from 'redux';
import flashMessages from "./store/reducers/flashMessages";
import auth from './store/reducers/auth';
import setup from './store/reducers/setup';
import book from './store/reducers/book';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default  combineReducers(( {
    flashMessages,
    auth,
    book,
    setup,
    toastr: toastrReducer
}))
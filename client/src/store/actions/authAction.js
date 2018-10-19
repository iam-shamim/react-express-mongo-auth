import server from "../../server";
import setAuthToken from '../../utils/setAuthToken'
import jwt from 'jsonwebtoken';
import {SET_CURRENT_USER} from "./types";
import {addFlashMessage} from "./flash";

export const userSignupRequest = (userData) => {
    return dispatch => {
        return server.post('/api/users',userData).then().catch((err)=>{
            const error = new Error(err.response.statusText);
            error.response = err.response.data;
            throw error;
        });
    };
};
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user,
    };
}
export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
};
function errorCatch(dispatch,err) {
    if(err.response.status==500){
        dispatch(addFlashMessage(
            {
                type: 'error',
                text: 'Server Error. Try again!',
            }
        ));
        return {
            status: false
        }
    }else{
        const error = new Error(err.response.statusText);
        error.response = err.response.data;
        throw error;
    }
}
export const login = (data) => {
    return dispatch => {
        return server.post('/api/auth',data).then((res)=>{
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            dispatch(setCurrentUser(jwt.decode(token)));
            return {
                status: true
            }
        }).catch((err)=>{
            return errorCatch(dispatch,err);
        });
    };
};
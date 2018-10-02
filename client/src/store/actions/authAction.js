import server from "../../server";
import setAuthToken from '../../utils/setAuthToken'
import jwt from 'jsonwebtoken';
import {SET_CURRENT_USER} from "./types";

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
export const login = (data) => {
    return dispatch => {
        return server.post('/api/auth',data).then((res)=>{
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            dispatch(setCurrentUser(jwt.decode(token)));
        }).catch((err)=>{
            const error = new Error(err.response.statusText);
            error.response = err.response.data;
            throw error;
        });
    };
};
import server from "../../server";

export const userSignupRequest = (userData) => {
    return dispatch => {
        return server.post('/api/users',userData).then().catch((err)=>{
            const error = new Error(err.response.statusText);
            error.response = err.response.data;
            throw error;
        });
    };
};
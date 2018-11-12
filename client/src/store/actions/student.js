import server from "../../server";
import errorCatch from "../../utils/errorCatch";
import {BOOK_SAVED, BOOK_FETCHED, BOOK_DELETED} from "./types";

function addCategory(book) {
    return {
        type: BOOK_SAVED,
        book
    }
}

export const saveStudent = (data) => {
    return dispatch => {
        return server.post('/api/students',data).then((res)=>{
            dispatch(addCategory(res.data.student));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const updateStudent = (data) => {
    return dispatch => {
        return server.put('/api/students',data).then((res)=>{
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
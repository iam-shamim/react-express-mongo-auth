import server from "../../server";
import errorCatch from "../../utils/errorCatch";
import {BOOK_SAVED, BOOK_FETCHED, BOOK_DELETED} from "./types";

function addCategory(book) {
    return {
        type: BOOK_SAVED,
        book
    }
}
function booksFetched(books) {
    return {
        type: BOOK_FETCHED,
        books
    }
}
function bookDeleted(_id) {
    return {
        type: BOOK_DELETED,
        _id
    }
}
export const saveBook = (data) => {
    return dispatch => {
        return server.post('/api/books',data).then((res)=>{
            //dispatch(addCategory(res.data.category));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const updateBook = (data) => {
    return dispatch => {
        return server.put('/api/books',data).then((res)=>{
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const getBooks = (data)=>{
    return dispatch => {
        return server.get('/api/books',{
            params: data
        }).then((res)=>{
            dispatch(booksFetched(res.data.books));
        }).catch((err)=>{
            return errorCatch(err);
        });
    }
};
export const bookDelete = (data) => {
    return dispatch => {
        return server.delete('/api/books',{ data }).then((res)=>{
            if(res.data.success === true){
                dispatch(bookDeleted(data._id))
            }
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};

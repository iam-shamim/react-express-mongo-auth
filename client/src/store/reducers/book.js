import {} from "../actions/types";
import {BOOK_FETCHED} from "../actions/types";
import {BOOK_DELETED} from "../actions/types";

const initialState = {
    bookList: {
        docs:[]
    },

};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case BOOK_FETCHED:
            return{
                ...state,
                bookList: action.books
            };
        case BOOK_DELETED:
            return{
                ...state,
                bookList: {
                    ...state.bookList,
                    docs: state.bookList.docs.filter((book)=>book._id !== action._id),
                }
            };
        default: return state;
    }

}
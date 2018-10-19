import {YEAR_FETCHED, YEAR_SAVED, YEAR_UPDATED, YEAR_DELETED} from "./types";
import server from "../../server";

export function addYear(year) {
    return {
        type: YEAR_SAVED,
        year
    }
}
export function yearUpdated(year) {
    return {
        type: YEAR_UPDATED,
        year
    }
}
function yearFetched(years) {
    return {
        type: YEAR_FETCHED,
        years
    }
}
function yearDeleted(_id) {
    return {
        type: YEAR_DELETED,
        _id
    }
}

export const getYear = ()=>{
    return dispatch => {
        return server.get('/api/setup/year').then((res)=>{
            dispatch(yearFetched(res.data.years));
        });
    }
};
export const saveYear = (data) => {
    return dispatch => {
        return server.post('/api/setup/year',data).then((res)=>{
            dispatch(addYear(res.data.year));
        }).catch((err)=>{
            const error = new Error(err.response.statusText);
            error.response = err.response.data;
            throw error;
        });
    };
};
export const updateYear = (data) => {
    return dispatch => {
        return server.put('/api/setup/year',data).then((res)=>{
            dispatch(yearUpdated(res.data.year));
        }).catch((err)=>{
            const error = new Error(err.response.statusText);
            error.response = err.response.data;
            throw error;
        });
    };
};
export const deleteYear = (data) => {
    console.log("data:",data);
    return dispatch => {
        return server.delete('/api/setup/year',{ data }).then((res)=>{
            if(res.data.success==true){
                dispatch(yearDeleted(data._id))
            }
        }).catch((err)=>{
            const error = new Error(err.response.statusText);
            error.response = err.response.data;
            throw error;
        });
    };
};
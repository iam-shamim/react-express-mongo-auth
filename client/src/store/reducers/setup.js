import {YEAR_DELETED, YEAR_FETCHED, YEAR_SAVED, YEAR_UPDATED} from "../actions/types";

const initialState = {
    years: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case YEAR_DELETED:
            console.log(action._id);
            return {
                ...state,
                years: state.years.filter((year)=> year._id !== action._id)
            };
        case YEAR_UPDATED:
            return {
                ...state,
                years: state.years.map(year=>{
                    if(year._id==action.year._id) {
                        console.log(year);
                        return action.year
                    }else{
                        return year;
                    }
                })
            };
        case YEAR_SAVED:
            return {
                ...state,
                years: [
                    ...state.years,
                    action.year
                ]
            };
        case YEAR_FETCHED:
            return {
                ...state,
                years: action.years
            };
        default: return state;
    }

}
import * as ActionTypes from "./ActionTypes";

export const faviourates = (state =[],action) =>
{
    switch (action.type)
    {
        case ActionTypes.ADD_FAVIOURATES:
            if(state.some(id=> id===action.payload))
                return state;
            else
                return state.concat(action.payload);

        case ActionTypes.DELETE_FAVIOURATES:
            return state.filter((id) => id !== action.payload);

        default:
            return state;
    }
};
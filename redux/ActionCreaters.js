import {baseUrl} from "../shared/baseUrl";
import * as ActionTypes from './ActionTypes';

export const fetchDishes=() => (dispatch) =>
{
    dispatch(dishesLoading());

    return fetch(baseUrl+'dishes').then(response=>
    {
        if(response.ok)
            return response;
        else
        {
            var error=new Error('Error'+ response.status+" "+response.statusText);
            error.response=response;
            throw error;
        }
    },error=>{
        var errmsg=new Error(error.message);
        throw errmsg;
    }).then(response=>response.json())
        .then(dishes=>dispatch(addDishes(dishes)))
        .catch((error)=> dispatch(dishesFailed(error.message)));
};

export const dishesLoading= ()=>(
{
    type:ActionTypes.DISHES_LOADING
});

export const addDishes= (dishes) =>(
    {
        payload: dishes,
        type: ActionTypes.ADD_DISHES
    }
);
export const dishesFailed= (errmsg) =>(
    {
        payload:errmsg,
        type: ActionTypes.LEADERS_FAILED
    }
);


export const fetchLeaderes=() => (dispatch) =>
{
    dispatch(leaderesLoading());

    return fetch(baseUrl+'leaders').then(response=>
    {
        if(response.ok)
            return response;
        else
        {
            var error=new Error('Error'+ response.status+" "+response.statusText);
            error.response=response;
            throw error;
        }
    },error=>{
        var errmsg=new Error(error.message);
        throw errmsg;
    }).then(response=>response.json())
        .then( (leaders)=>dispatch(addLeaderes(leaders)))
        .catch((error)=> dispatch(leaderesFailed(error.message)));
};

export const leaderesLoading= ()=>(
{
    type:ActionTypes.LEADERS_LOADING
});

export const addLeaderes= (leaders) =>(
    {
        payload: leaders,
        type: ActionTypes.ADD_LEADERS
    }
)
export const leaderesFailed= (errmsg) =>(
    {
        payload:errmsg,
        type: ActionTypes.LEADERS_FAILED
    }
);


export const fetchPromotions=() => (dispatch) =>
{
    dispatch(promotionsLoading());

    return fetch(baseUrl+'promotions').then(response=>
    {
        if(response.ok)
            return response;
        else
        {
            var error=new Error('Error'+ response.status+" "+response.statusText);
            error.response=response;
            throw error;
        }
    },error=>{
        var errmsg=new Error(error.message);
        throw errmsg;
    }).then(response=>response.json())
        .then( (promotion)=>dispatch(addPromotions(leaders)))
        .catch((error)=> dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading= ()=>(
{
    type:ActionTypes.PROMOTIONS_LOADING
});

export const addPromotions= (comments) =>(
    {
        payload: comments,
        type: ActionTypes.ADD_PROMOTIONS
    }
);
export const promotionsFailed= (errmsg) =>(
    {
        payload:errmsg,
        type: ActionTypes.PROMOTIONS_LOADING
    }
);



export const fetchComments=() => (dispatch) =>
{

    return fetch(baseUrl+'comments').then(response=>
    {
        if(response.ok)
            return response;
        else
        {
            var error=new Error('Error'+ response.status+" "+response.statusText);
            error.response=response;
            throw error;
        }
    },error=>{
        var errmsg=new Error(error.message);
        throw errmsg;
    }).then(response=>response.json())
        .then( (comments)=>dispatch(addComments(comments)))
        .catch((error)=> dispatch(commentsFailed(error.message)));
};

export const addComments= (comments) =>(
    {
        payload: comments,
        type: ActionTypes.ADD_COMMENTS
    }
);
export const commentsFailed= (errmsg) =>(
    {
        payload:errmsg,
        type: ActionTypes.COMMENTS_FAILED
    }
);
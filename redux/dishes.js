import * as ActionTypes from './ActionTypes';

export const dishes= (state={dishes:null,isLoading:true,errMsg:null},action)=>
{
   switch (action.type)
   {
       case ActionTypes.ADD_DISHES:{
           return ({...state,isLoading: false, errMsg: null,dishes:action.payload});
       }

       case ActionTypes.DISHES_FAILED:{
           return ({...state,isLoading: false, errMsg: action.payload});
       }

       case ActionTypes.DISHES_LOADING:{
           return ({...state,isLoading: true, errMsg: null,dishes:[]});
       }

       default : return state;
   }
}
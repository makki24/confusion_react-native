import {applyMiddleware, combineReducers, createStore} from "redux";
import {dishes} from "./dishes";
import {comments} from "./comments";
import {leaders} from "./leaders";
import {promotions} from "./promotions";
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";

export const ConfigureStore =() =>{
    const store= createStore(combineReducers({
        dishes,
        comments,
        promotions,
        leaders
    }),applyMiddleware(thunk,logger));

    return store;
}
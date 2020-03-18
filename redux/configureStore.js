import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {logger} from "redux-logger/src";
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import {faviourates} from "./faviourates";
import {persistCombineReducers,persistStore} from "redux-persist";
import storage from "redux-persist/es/storage";

const config={
    key: 'root',
    storage,
    debug:'true'
}
export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config,{
            dishes,
            comments,
            promotions,
            leaders,
            faviourates
        }),
        applyMiddleware(thunk, logger)
    );

    const persistStor=persistStore(store);
    return {persistStor,store};
}
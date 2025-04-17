import {
    legacy_createStore as createStore,
    compose,
    applyMiddleware
} from "redux";
import {thunk} from "redux-thunk";
import {reducers } from '../Reduces'

function saveLCStorage(store){
    try {
        const ser = JSON.stringify(store);
        window.localStorage.setItem('store', ser)
    } catch (error) {
        console.log(error)
    }
}

function loadFromLCStorage(){
    try {
        const ser = window.localStorage.getItem('store');
        if(ser===null){
            return undefined;
        }
        return JSON.parse(ser)
    } catch (error) {
        return undefined;
    }
}

const com = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const per = loadFromLCStorage();
const store = createStore(reducers, per, com(applyMiddleware(thunk)));

store.subscribe(()=> saveLCStorage(store.getState()));

export default store;

import { legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";

import {applyMiddleware} from 'redux'
import thunk from "redux-thunk"; 
import rootReducer from '../reducers/combineReducer';


const Store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default Store;
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

const initialState = {};
const enhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducer, initialState, enhancer);

export default store;

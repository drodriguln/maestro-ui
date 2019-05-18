import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import reducer from './reducer';

const initialState = {};
const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducer, initialState, enhancer);

export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import reducer from './reducer';

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const initialState = {};
const enhancer = compose(applyMiddleware(thunk), enableReduxDevTools);

const store = createStore(reducer, initialState, enhancer);

export default store;

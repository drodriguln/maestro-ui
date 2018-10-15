import { createStore } from 'redux';
import reducer from './reducer';

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const initialState = {
  playlist: []
};

const store = createStore(reducer, initialState, enableReduxDevTools);

export default store;

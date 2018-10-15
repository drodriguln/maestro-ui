import { combineReducers } from 'redux';
import playerReducer from './player/reducer';

const reducer = combineReducers({
  player: playerReducer
});

export default reducer;

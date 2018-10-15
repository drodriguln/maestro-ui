import { combineReducers } from 'redux';
import libraryReducer from './library/reducer';
import playerReducer from './player/reducer';

const reducer = combineReducers({
  library: libraryReducer,
  player: playerReducer
});

export default reducer;

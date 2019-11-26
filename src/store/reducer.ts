import { combineReducers } from 'redux';
import libraryReducer from './library/reducer';
import playerReducer from './player/reducer';
import themeReducer from './theme/reducer';

const reducer = combineReducers({
  library: libraryReducer,
  player: playerReducer,
  theme: themeReducer,
});

export default reducer;

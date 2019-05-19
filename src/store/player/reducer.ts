import { SET_PLAYER_DATA, SET_SONG_FILE_URL, SET_ARTWORK_FILE_URL } from './actions';

const initialState = {
  artist: {},
  album: {},
  song: {},
  playlist: [],
  songFileUrl: '',
  artworkFileUrl: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_PLAYER_DATA:
      return Object.assign({}, state, action.payload);
    case SET_SONG_FILE_URL:
      return Object.assign({}, state, { songFileUrl: action.payload });
    case SET_ARTWORK_FILE_URL:
      return Object.assign({}, state, { artworkFileUrl: action.payload });
    default:
      return state;
  }
};

export default reducer;

import { SET_ARTISTS, SET_ARTIST, SET_ALBUMS, SET_ALBUM, SET_SONGS, SET_SONG } from './actions';

const initialState = {
  artists: [],
  artist: {},
  albums: [],
  album: {},
  songs: [],
  song: {}
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_ARTISTS:
      return Object.assign({}, state, {
        artists: action.payload,
        artist: {},
        albums: [],
        album: {},
        songs: [],
        song: {}
      });
    case SET_ARTIST:
      return Object.assign({}, state, {
        artist: action.payload,
        albums: [],
        album: {},
        songs: [],
        song: {}
      });
    case SET_ALBUMS:
      return Object.assign({}, state, {
        albums: action.payload,
        album: {},
        songs: [],
        song: {}
      });
    case SET_ALBUM:
      return Object.assign({}, state, {
        album: action.payload,
        songs: [],
        song: {}
      });
    case SET_SONGS:
      return Object.assign({}, state, {
        songs: action.payload,
        song: {}
      });
    case SET_SONG:
      return Object.assign({}, state, { song: action.payload });
    default:
      return state;
  }
};

export default reducer;

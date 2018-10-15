import { SET_PLAYER } from './actions';

const initialState = {
  artist: {},
  album: {},
  song: {},
  playlist: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_PLAYER:
      return {
        artist: action.payload.artist,
        album: action.payload.album,
        song: action.payload.song,
        playlist: action.payload.playlist
      }
    default:
      return state;
  }
}

export default reducer;

import { PlayerAction } from './actions';
import { Action, Album, Artist, Song } from "../types";

export type PlayerStore = typeof initialState;
const initialState = {
  artist: {} as Artist,
  album: {} as Album,
  song: {} as Song,
  playlist: [] as Song[],
  songFileUrl: '',
  artworkFileUrl: ''
};

const reducer = (state = initialState, action: Action) => {
  switch(action.type) {
    case PlayerAction.SET_PLAYER_DATA:
      return Object.assign({}, state, action.payload);
    case PlayerAction.SET_SONG_FILE_URL:
      return Object.assign({}, state, { songFileUrl: action.payload });
    case PlayerAction.SET_ARTWORK_FILE_URL:
      return Object.assign({}, state, { artworkFileUrl: action.payload });
    default:
      return state;
  }
};

export default reducer;

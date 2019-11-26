import { PlayerAction } from './actions';
import {
  Action, Album, Artist, Song,
} from '../types';

const initialState = {
  artist: {} as Artist,
  album: {} as Album,
  song: {} as Song,
  playlist: [] as Song[],
  songFileUrl: '',
  artworkFileUrl: '',
};

export type PlayerStore = typeof initialState;

const playerReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case PlayerAction.SET_PLAYER_DATA:
      return { ...state, ...action.payload };
    case PlayerAction.SET_SONG_FILE_URL:
      return { ...state, songFileUrl: action.payload };
    case PlayerAction.SET_ARTWORK_FILE_URL:
      return { ...state, artworkFileUrl: action.payload };
    default:
      return state;
  }
};

export default playerReducer;

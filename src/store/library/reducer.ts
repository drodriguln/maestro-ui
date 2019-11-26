import { LibraryAction } from './actions';
import {Action, Album, Artist, Song} from "../types";

export type LibraryStore = typeof initialState;
const initialState = {
  artists: [] as Artist[],
  artist: {} as Artist,
  albums: [] as Album[],
  album: {} as Album,
  songs: [] as Song[],
  song: {} as Song
};

const libraryReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LibraryAction.SET_ARTISTS:
      return Object.assign({}, state, {
        artists: action.payload,
        artist: {},
        albums: [],
        album: {},
        songs: [],
        song: {}
      });
    case LibraryAction.SET_ARTIST:
      return Object.assign({}, state, {
        artist: action.payload,
        albums: [],
        album: {},
        songs: [],
        song: {}
      });
    case LibraryAction.SET_ALBUMS:
      return Object.assign({}, state, {
        albums: action.payload,
        album: {},
        songs: [],
        song: {}
      });
    case LibraryAction.SET_ALBUM:
      return Object.assign({}, state, {
        album: action.payload,
        songs: [],
        song: {}
      });
    case LibraryAction.SET_SONGS:
      return Object.assign({}, state, {
        songs: action.payload,
        song: {}
      });
    case LibraryAction.SET_SONG:
      return Object.assign({}, state, {
        song: action.payload
      });
    default:
      return state;
  }
};

export default libraryReducer;

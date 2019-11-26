import { LibraryAction } from './actions';
import {
  Action, Album, Artist, Song,
} from '../types';

const initialState = {
  artists: [] as Artist[],
  artist: {} as Artist,
  albums: [] as Album[],
  album: {} as Album,
  songs: [] as Song[],
  song: {} as Song,
};

export type LibraryStore = typeof initialState;

const libraryReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LibraryAction.SET_ARTISTS:
      return {
        ...state,
        artists: action.payload,
        artist: {} as Artist,
        albums: [] as Album[],
        album: {} as Album,
        songs: [] as Song[],
        song: {} as Song,
      };
    case LibraryAction.SET_ARTIST:
      return {
        ...state,
        artist: action.payload,
        albums: [] as Album[],
        album: {} as Album,
        songs: [] as Song[],
        song: {} as Song,
      };
    case LibraryAction.SET_ALBUMS:
      return {
        ...state,
        albums: action.payload,
        album: {} as Album,
        songs: [] as Song[],
        song: {} as Song,
      };
    case LibraryAction.SET_ALBUM:
      return {
        ...state,
        album: action.payload,
        songs: [] as Song[],
        song: {} as Song,
      };
    case LibraryAction.SET_SONGS:
      return {
        ...state,
        songs: action.payload,
        song: {} as Song,
      };
    case LibraryAction.SET_SONG:
      return {
        ...state,
        song: action.payload,
      };
    default:
      return state;
  }
};

export default libraryReducer;

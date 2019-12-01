import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { PlayerStore } from './player/reducer';
import { LibraryStore } from './library/reducer';
import { ThemeStore } from './theme/reducer';

export interface Store {
  library: LibraryStore,
  player: PlayerStore,
  theme: ThemeStore
}

export interface Action extends AnyAction {
  payload?: any;
}
export interface Dispatch extends ThunkDispatch<Store, any, Action>{}

export interface Song {
  id: string;
  name: string;
  trackNumber: string;
  year: string;
  fileId: string;
  artworkFileId: string;
}

export interface Album {
  id: string;
  name: string;
  songs: Song[];
}

export interface Artist {
  id: string;
  name: string;
  albums: Album[];
}

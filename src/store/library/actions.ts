import {
  Album, Artist, Dispatch, Song,
} from '../types';

interface ApiResponse {
  data: Artist[] | Album[] | Song[];
  message: string;
}

export enum LibraryAction {
  SET_ARTIST = 'SET_ARTIST',
  SET_ALBUM = 'SET_ALBUM',
  SET_ARTISTS = 'SET_ARTISTS',
  SET_ALBUMS = 'SET_ALBUMS',
  SET_SONGS = 'SET_SONGS',
  RESET = 'RESET'
}

// Needs to be externalized to some config file.
const API_URL = 'https://drodriguln-maestro-api.herokuapp.com/artists/';

export const setArtist = (artist: Artist) => (
  (dispatch: Dispatch) => dispatch({ type: LibraryAction.SET_ARTIST, payload: artist })
);

export const setAlbum = (album: Album) => (
  (dispatch: Dispatch) => dispatch({ type: LibraryAction.SET_ALBUM, payload: album })
);

export const reset = () => (
  (dispatch: Dispatch) => dispatch({ type: LibraryAction.RESET })
);

export const fetchArtists = () => (
  (dispatch: Dispatch) => fetch(API_URL)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error('Failed to retrieve list of artists.');
    })
    .then((json: ApiResponse) => json.data)
    .then((artists) => dispatch({ type: LibraryAction.SET_ARTISTS, payload: artists }))
    .catch((e) => console.error(e))
);

export const fetchAlbums = (artistId: string) => (
  (dispatch: Dispatch) => fetch(`${API_URL}${artistId}/albums`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error('Failed to retrieve list of albums.');
    })
    .then((json: ApiResponse) => json.data)
    .then((albums) => dispatch({ type: LibraryAction.SET_ALBUMS, payload: albums }))
    .catch((e) => console.error(e))
);

export const fetchSongs = (artistId: string, albumId: string) => (
  (dispatch: Dispatch) => fetch(`${API_URL}${artistId}/albums/${albumId}/songs`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error('Failed to retrieve list of songs.');
    })
    .then((json: ApiResponse) => json.data)
    .then((songs) => dispatch({ type: LibraryAction.SET_SONGS, payload: songs }))
    .catch((e) => console.error(e))
);

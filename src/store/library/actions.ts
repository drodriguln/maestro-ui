import {Album, Artist, Dispatch, Song} from "../types";

// Needs to be externalized to some config file.
const API_URL = 'https://drodriguln-maestro-api.herokuapp.com/artists/';

export enum LibraryAction {
  SET_ARTIST = "SET_ARTIST",
  SET_ALBUM = "SET_ALBUM",
  SET_SONG = "SET_SONG",
  SET_ARTISTS = "SET_ARTISTS",
  SET_ALBUMS = "SET_ALBUMS",
  SET_SONGS = "SET_SONGS"
}

export const setArtist = (artist: Artist) => (
  (dispatch: Dispatch) => dispatch({ type: LibraryAction.SET_ARTIST, payload: artist })
);

export const setAlbum = (album: Album) => (
  (dispatch: Dispatch) => dispatch({ type: LibraryAction.SET_ALBUM, payload: album })
);

export const setSong = (song: Song) => (
  (dispatch: Dispatch) => dispatch({ type: LibraryAction.SET_SONG, payload: song })
);

export const fetchArtists = () => (
  (dispatch: Dispatch) => fetch(API_URL)
    .then(response => response.json())
    .then(artists => dispatch({ type: LibraryAction.SET_ARTISTS, payload: artists }))
);

export const fetchAlbums = (artistId: string) => (
  (dispatch: Dispatch) => fetch(`${API_URL}${artistId}/albums`)
    .then(response => response.json())
    .then(albums => dispatch({ type: LibraryAction.SET_ALBUMS, payload: albums }))
);

export const fetchSongs = (artistId: string, albumId: string) => (
  (dispatch: Dispatch) => fetch(`${API_URL}${artistId}/albums/${albumId}/songs`)
    .then(response => response.json())
    .then(songs => dispatch({ type: LibraryAction.SET_SONGS, payload: songs }))
);

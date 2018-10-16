const API_URL = 'https://drodriguln-maestro-api.herokuapp.com/artists/';

export const SET_ARTIST = "SET_ARTIST";
export const setArtist = (artist) =>
  dispatch => dispatch({ type: SET_ARTIST, payload: artist });

export const SET_ALBUM = "SET_ALBUM";
export const setAlbum = (album) =>
  dispatch => dispatch({ type: SET_ALBUM, payload: album });

export const SET_SONG = "SET_SONG";
export const setSong = (song) =>
  dispatch => dispatch({ type: SET_SONG, payload: song });

export const SET_ARTISTS = "SET_ARTISTS";
export const fetchArtists = () =>
  dispatch => fetch(API_URL)
    .then(response => response.json())
    .then(artists => dispatch({ type: SET_ARTISTS, payload: artists }));

export const SET_ALBUMS = "SET_ALBUMS";
export const fetchAlbums = (artistId) =>
  dispatch => fetch(API_URL + artistId + '/albums')
    .then(response => response.json())
    .then(albums => dispatch({ type: SET_ALBUMS, payload: albums }));

export const SET_SONGS = "SET_SONGS";
export const fetchSongs = (artistId, albumId) =>
  dispatch => fetch(API_URL + artistId + '/albums/' + albumId + '/songs')
    .then(response => response.json())
    .then(songs => dispatch({ type: SET_SONGS, payload: songs }));

const API_URL = 'https://drodriguln-maestro-api.herokuapp.com/artists/';

export const SET_PLAYER_DATA = "SET_PLAYER_DATA";
export const setPlayerData = (artist, album, song, playlist) =>
  (dispatch) => dispatch({
    type: SET_PLAYER_DATA,
    payload: {
      artist: artist,
      album: album,
      song: song,
      playlist: playlist
    }
  });

export const SET_SONG_FILE_URL = "SET_SONG_FILE_URL";
export const fetchSongFileUrl = (artistId, albumId, songId) =>
  (dispatch) => fetch(API_URL + artistId + '/albums/' + albumId + '/songs/' + songId + '/file')
    .then(response => response.blob())
    .then(blob => dispatch({ type: SET_SONG_FILE_URL, payload: URL.createObjectURL(blob) }));

export const SET_ARTWORK_FILE_URL = "SET_ARTWORK_FILE_URL";
export const fetchArtworkFileUrl = (artistId, albumId, songId) =>
  (dispatch) => fetch(API_URL + artistId + '/albums/' + albumId + '/songs/' + songId + '/artwork')
    .then(response => response.blob())
    .then(blob => dispatch({ type: SET_ARTWORK_FILE_URL, payload: URL.createObjectURL(blob) }));

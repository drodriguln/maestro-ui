import {Album, Artist, Dispatch, Song} from "../types";

// Needs to be externalized to some config file.
const API_URL = 'https://drodriguln-maestro-api.herokuapp.com/artists/';

export enum PlayerAction {
  SET_PLAYER_DATA = "SET_PLAYER_DATA",
  SET_SONG_FILE_URL = "SET_SONG_FILE_URL",
  SET_ARTWORK_FILE_URL = "SET_ARTWORK_FILE_URL"
}

export const setPlayerData = (artist: Artist, album: Album, song: Song, playlist: Song[]) => (
  (dispatch: Dispatch) => dispatch({
    type: PlayerAction.SET_PLAYER_DATA,
    payload: {
      artist: artist,
      album: album,
      song: song,
      playlist: playlist
    }
  })
);

export const fetchSongFileUrl = (artistId: string, albumId: string, songId: string) => (
  (dispatch: Dispatch) => fetch(`${API_URL}${artistId}/albums/${albumId}/songs/${songId}/file`)
    .then(response => response.blob())
    .then(blob => dispatch({
      type: PlayerAction.SET_SONG_FILE_URL,
      payload: URL.createObjectURL(blob)
    }))
);

export const fetchArtworkFileUrl = (artistId: string, albumId: string, songId: string) => (
  (dispatch: Dispatch) => fetch(`${API_URL}${artistId}/albums/${albumId}/songs/${songId}/artwork`)
    .then(response => response.blob())
    .then(blob => dispatch({
      type: PlayerAction.SET_ARTWORK_FILE_URL,
      payload: URL.createObjectURL(blob)
    }))
);

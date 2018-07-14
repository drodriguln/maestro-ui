const artistsUrl = 'https://drodriguln-maestro-api.herokuapp.com/artists/';

export const findAllArtists = () =>
  fetch(artistsUrl)
    .then(response => response.json());

export const findAllAlbums = (artistId) =>
  fetch(artistsUrl + artistId + '/albums')
    .then(response => response.json());

export const findAllSongs = (artistId, albumId) =>
  fetch(artistsUrl + artistId + '/albums/' + albumId + '/songs')
    .then(response => response.json());

export const findSongFile = (artistId, albumId, songId) =>
  fetch(artistsUrl + artistId + '/albums/' + albumId + '/songs/' + songId + '/file')
    .then(response => response.blob());

export const findArtworkFile = (artistId, albumId, songId) =>
  fetch(artistsUrl + artistId + '/albums/' + albumId + '/songs/' + songId + '/artwork')
    .then(response => response.blob());

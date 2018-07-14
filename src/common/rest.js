export const findAllArtists = () =>
  fetch('https://drodriguln-maestro-api.herokuapp.com/artists/')
    .then(response => response.json());

export const findAllAlbums = (artistId) =>
  fetch('https://drodriguln-maestro-api.herokuapp.com/artists/' + artistId + '/albums')
    .then(response => response.json());

export const findAllSongs = (artistId, albumId) =>
  fetch('https://drodriguln-maestro-api.herokuapp.com/artists/' + artistId + '/albums/' + albumId + '/songs')
    .then(response => response.json());

export const findSongFile = (artistId, albumId, songId) =>
  fetch('https://drodriguln-maestro-api.herokuapp.com/artists/' + artistId + '/albums/' + albumId + '/songs/' + songId + '/file')
    .then(response => response.blob());

export const findArtworkFile = (artistId, albumId, songId) =>
fetch('https://drodriguln-maestro-api.herokuapp.com/artists/' + artistId + '/albums/' + albumId + '/songs/' + songId + '/artwork')
  .then(response => response.blob());
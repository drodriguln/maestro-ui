export const findSongFile = (artistId, albumId, songId) =>
  fetch(artistsUrl + artistId + '/albums/' + albumId + '/songs/' + songId + '/file')
    .then(response => response.blob());

export const findArtworkFile = (artistId, albumId, songId) =>
  fetch(artistsUrl + artistId + '/albums/' + albumId + '/songs/' + songId + '/artwork')
    .then(response => response.blob());

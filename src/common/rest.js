export const findAllArtists = () =>
  fetch('https://drodriguln-maestro-api.herokuapp.com/artists/')
    .then(response => response.json());

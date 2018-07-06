import React from 'react';
import Library from './Library';

const Pinboard = (props) =>
    props.pin == 'library'
      ? <Library
          onSelect={(artist, album, song) => props.onLibrarySelect(artist, album, song)}
        />
      : <span />

export default Pinboard

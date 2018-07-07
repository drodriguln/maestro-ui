import React from 'react';
import Library from './Library';

const Pinboard = (props) =>
    props.pin === 'library'
      ? <Library
          onSelect={(playlist, songInfo) => props.onLibrarySelect(playlist, songInfo)}
        />
      : <span />

export default Pinboard

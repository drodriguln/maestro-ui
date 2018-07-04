import React from 'react';
import Library from './Library';

const Spotlight = (props) => {
  return (
    props.currentView == 'library'
      ? <Library />
      : <span />
  )
}

export default Spotlight;

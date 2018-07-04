import React from 'react';
import { isEmpty } from '../common/functions';
import Library from './Library';
import Player from './Player';

export default class Spotlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {},
      album: {},
      song: {}
    }
  }

  setLibrarySelection = (artist, album, song) => {
    this.setState({ artist: artist, album: album, song: song });
  }

  render() {
    return (
      <span>
        { this.props.currentView == 'library'
          ? <Library
              onSelect={(artist, album, song) => this.setLibrarySelection(artist, album, song)}
            />
          : <span />
        }
        <br />
        { !isEmpty(this.state.artist) && !isEmpty(this.state.album) && !isEmpty(this.state.song)
          ? <Player
              artist={this.state.artist}
              album={this.state.album}
              song={this.state.song}
            />
          : <span />
        }
      </span>
    )
  }
}

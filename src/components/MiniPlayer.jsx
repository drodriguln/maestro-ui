import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AudioPlayer from 'react-audio-player';

const styles = theme => ({
  cover: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'inline-block',
    verticalAlign: 'bottom'
  }
});

class MiniPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true
    }
  }

  play = () =>  {
    this.audioNode.audioEl.play();
    this.setState({ isPlaying: true });
  }

  pause = () => {
    this.audioNode.audioEl.pause();
    this.setState({ isPlaying: false });
  }

  previous = () => {
    const { playlist, songInfo } = this.props;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].id === songInfo.song.id && i > 0) {
        let newSongInfo = {
          artist: songInfo.artist,
          album: songInfo.album,
          song: playlist[i - 1]
        };
        console.log('SONG CHANGE PREVIOUS');
        this.props.onSongChange(newSongInfo);
        break;
      }
    }
  }

  next = () => {
    const { playlist, songInfo } = this.props;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].id === songInfo.song.id && i < playlist.length - 1) {
        let newSongInfo = {
          artist: songInfo.artist,
          album: songInfo.album,
          song: playlist[i + 1]
        };
        console.log('SONG CHANGE NEXT');
        this.props.onSongChange(newSongInfo);
        break;
      }
    }
  }

  render() {
    const songFileUrl = 'https://drodriguln-maestro-api.herokuapp.com/artists/'
      + this.props.songInfo.artist.id + '/albums/' + this.props.songInfo.album.id
      + '/songs/' + this.props.songInfo.song.id + '/file';
    const songArtworkUrl = 'https://drodriguln-maestro-api.herokuapp.com/artists/'
      + this.props.songInfo.artist.id + '/albums/' + this.props.songInfo.album.id
      + '/songs/' + this.props.songInfo.song.id + '/artwork';
    return (
      <div>
        <AudioPlayer
          autoPlay
          src={songFileUrl}
          ref={(node) => this.audioNode = node}
        />
        <CardMedia
          className={this.props.classes.cover}
          image={songArtworkUrl}
        />
        <IconButton>
          <SkipPreviousIcon onClick={this.previous} />
        </IconButton>
        <IconButton onClick={this.state.isPlaying ? this.pause : this.play}>
          { this.state.isPlaying
              ? <PauseCircleIcon />
              : <PlayArrowIcon />
          }
        </IconButton>
        <IconButton onClick={this.next}>
          <SkipNextIcon />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MiniPlayer);

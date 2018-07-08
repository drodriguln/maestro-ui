import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CircularProgress from '@material-ui/core/CircularProgress';
import AudioPlayer from 'react-audio-player';

const styles = theme => ({
  cover: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'inline-block',
    verticalAlign: 'bottom'
  },
  progressCircle: {
    color: theme.palette.text.secondary,
    verticalAlign: 'bottom'
  },
  disc: {
    marginLeft: 2,
    marginRight: 2
  }
});

class MiniPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
      currentPosition: 0
    }
  }

  play = () =>  {
    this.audioNode.audioEl.play();
    this.setState({ isPlaying: true });
  };

  pause = () => {
    this.audioNode.audioEl.pause();
    this.setState({ isPlaying: false });
  };

  previous = () => {
    const { playlist, songInfo } = this.props;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].id === songInfo.song.id && i > 0) {
        let newSongInfo = {
          artist: songInfo.artist,
          album: songInfo.album,
          song: playlist[i - 1]
        };
        this.props.onSongChange(newSongInfo);
        break;
      }
    }
  };

  next = () => {
    const { playlist, songInfo } = this.props;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].id === songInfo.song.id && i < playlist.length - 1) {
        let newSongInfo = {
          artist: songInfo.artist,
          album: songInfo.album,
          song: playlist[i + 1]
        };
        this.props.onSongChange(newSongInfo);
        break;
      }
    }
  };

  setAudioNode = (node) => this.audioNode = node;
  setCurrentPosition = (position) => {
    let songLength = this.audioNode !== undefined ? this.audioNode.audioEl.duration : 1;
    this.setState({ currentPosition: position / songLength * 100 });
  };

  render() {
    const { classes } = this.props;
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
          ref={this.setAudioNode}
          listenInterval={100}
          onListen={this.setCurrentPosition}
        />
        <span className={classes.disc}>
          <CircularProgress
            className={classes.progressCircle}
            variant="static" size={45} value={this.state.currentPosition}
          />
        </span>
        <span className={classes.disc}>
          <IconButton>
            <SkipPreviousIcon onClick={this.previous} />
          </IconButton>
        </span>
        <span className={classes.disc}>
          <IconButton onClick={this.state.isPlaying ? this.pause : this.play}>
            { this.state.isPlaying
              ? <PauseCircleIcon />
              : <PlayArrowIcon />
            }
          </IconButton>
        </span>
        <span className={classes.disc}>
          <IconButton onClick={this.next}>
            <SkipNextIcon />
          </IconButton>
        </span>
        <span className={classes.disc}>
          <CardMedia
            className={this.props.classes.cover}
            image={songArtworkUrl}
          />
        </span>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MiniPlayer);

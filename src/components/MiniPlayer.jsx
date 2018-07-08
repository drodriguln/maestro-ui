import React from 'react';
import PopupPlayer from './PopupPlayer';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AudioPlayer from 'react-audio-player';

const styles = theme => ({
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 24,
    display: 'inline-block',
    verticalAlign: 'bottom'
  }
});

class MiniPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
      currentPosition: 0,
      popupPlayerAnchorEl: null
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
  handleOpenPopupPlayer = event => {
    this.setState({ popupPlayerAnchorEl: event.currentTarget });
  };

  handleClosePopupPlayer = () => {
    this.setState({ popupPlayerAnchorEl: null });
  };

  render() {
    const { songInfo, classes } = this.props;
    const { isPlaying, currentPosition, popupPlayerAnchorEl } = this.state;
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
        <span className={classes.controller}>
          <IconButton>
            <SkipPreviousIcon onClick={this.previous} />
          </IconButton>
        </span>
        <span className={classes.controller}>
          <IconButton onClick={isPlaying ? this.pause : this.play}>
            { isPlaying
              ? <PauseCircleIcon />
              : <PlayArrowIcon />
            }
          </IconButton>
        </span>
        <span className={classes.controller}>
          <IconButton onClick={this.next}>
            <SkipNextIcon />
          </IconButton>
        </span>
        <span className={classes.controller}>
          <IconButton onClick={this.handleOpenPopupPlayer}>
            <CardMedia
              className={classes.artwork}
              image={songArtworkUrl}
            />
          </IconButton>
        </span>
        <Popover
          open={popupPlayerAnchorEl != null}
          anchorEl={popupPlayerAnchorEl}
          onClose={this.handleClosePopupPlayer}
          anchorPosition={{ top: 500 }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <PopupPlayer
            songInfo={songInfo}
            songFileUrl={songFileUrl}
            songArtworkUrl={songArtworkUrl}
            isPlaying={isPlaying}
            currentPosition={currentPosition}
            onPlay={this.play}
            onPause={this.pause}
            onPrevious={this.previous}
            onNext={this.next}
          />
        </Popover>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MiniPlayer);

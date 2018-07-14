import React from 'react';
import { findSongFile, findArtworkFile } from '../common/rest';
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
      popupPlayerAnchorEl: null,
      songFileUrl: null,
      songArtworkUrl: null
    };
    this.load(this.props.songInfo.artist.id, this.props.songInfo.album.id, this.props.songInfo.song.id);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.songInfo.artist.id !== nextProps.songInfo.artist.id
      || this.props.songInfo.album.id !== nextProps.songInfo.album.id
      || this.props.songInfo.song.id !== nextProps.songInfo.song.id)
    {
      this.load(nextProps.songInfo.artist.id, nextProps.songInfo.album.id, nextProps.songInfo.song.id);
    }
  }

  load = (artistId, albumId, songId) => {
    if (this.audioNode !== undefined) {
      this.stop();
      this.setState({ currentPosition: 0 });
    }
    findSongFile(artistId, albumId, songId)
      .then((blob) => this.setState({ songFileUrl: URL.createObjectURL(blob) }));
    findArtworkFile(artistId, albumId, songId)
      .then((blob) => this.setState({ songArtworkUrl: URL.createObjectURL(blob) }));
  };

  play = () =>  {
    this.audioNode.audioEl.play();
    this.setState({ isPlaying: true });
  };

  stop = () => {
    this.audioNode.audioEl.pause();
    this.audioNode.audioEl.currentTime = 0;
  }

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
  setCurrentTrackedPosition = (position) => {
    let songLength = this.audioNode !== undefined ? this.audioNode.audioEl.duration : 1;
    this.setState({ currentPosition: position / songLength * 100 });
  };
  changeCurrentPosition = (position) => {
    this.audioNode.audioEl.currentTime = (position * this.audioNode.audioEl.duration) / 100;
    this.setState({ currentPosition: position });
  }

  handleOpenPopupPlayer = event => {
    this.setState({ popupPlayerAnchorEl: event.currentTarget });
  };

  handleClosePopupPlayer = () => {
    this.setState({ popupPlayerAnchorEl: null });
  };

  render() {
    const { songInfo, classes } = this.props;
    const { songFileUrl, songArtworkUrl, isPlaying, currentPosition, popupPlayerAnchorEl } = this.state;
    return (
      <div>
        <AudioPlayer
          autoPlay
          src={songFileUrl}
          ref={this.setAudioNode}
          listenInterval={100}
          onListen={this.setCurrentTrackedPosition}
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
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <PopupPlayer
            songInfo={songInfo}
            songArtworkUrl={songArtworkUrl}
            isPlaying={isPlaying}
            currentPosition={currentPosition}
            onChangePosition={this.changeCurrentPosition}
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

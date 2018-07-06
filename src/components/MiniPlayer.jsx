import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';

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
    this.play();
  }

  audio = new Audio();

  play = () => {
    this.audio.src = 'https://drodriguln-maestro-api.herokuapp.com/artists/'
      + this.props.songInfo.artist.id + '/albums/' + this.props.songInfo.album.id
      + '/songs/' + this.props.songInfo.song.id + '/file';
    this.audio.play();
    this.setState({ isPlaying: true });
  }

  pause = () => {
    this.audio.pause();
    this.setState({ isPlaying: false });
  }

  render() {
    const artworkUrl = 'https://drodriguln-maestro-api.herokuapp.com/artists/'
      + this.props.songInfo.artist.id + '/albums/' + this.props.songInfo.album.id
      + '/songs/' + this.props.songInfo.song.id + '/artwork';
    return (
      <div>
        <CardMedia
          className={this.props.classes.cover}
          image={artworkUrl}
        />
        <IconButton aria-label="Previous">
          <SkipPreviousIcon />
        </IconButton>
        <IconButton aria-label="Play/pause">
          { this.state.isPlaying
              ? <PauseCircleIcon onClick={this.pause} />
              : <PlayArrowIcon onClick={this.play} />
          }
        </IconButton>
        <IconButton aria-label="Next">
          <SkipNextIcon />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MiniPlayer);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  cover: {
    width: 350,
    height: 350,
  },
  text: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 5
  },
  buttons: {
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  progressBar: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  }
});

class PopupPlayer extends React.Component {

  constructor(props) {
    super(props);
  }

  play = () => this.props.onPlay();
  pause = () => this.props.onPause();
  previous = () => this.props.onPrevious();
  next = () => this.props.onNext();
  changeSliderPosition = (event, value) => this.props.onChangePosition(value);

  render() {
    const { classes, songInfo, songArtworkUrl, isPlaying, currentPosition } = this.props;
    return (
      <div>
        <CardMedia
          className={classes.cover}
          image={songArtworkUrl}
        />
        <div>
          <div className={classes.text}>
            <Typography variant="headline">
              {songInfo.song.name}
            </Typography>
            <Typography variant="caption">
              {songInfo.album.name}
            </Typography>
            <Typography variant="caption">
              {songInfo.artist.name}
            </Typography>
          </div>
          <div className={classes.buttons}>
            <Tooltip title="Coming Soon" placement="top">
              <span>
                <IconButton disabled>
                  <RepeatIcon />
                </IconButton>
              </span>
            </Tooltip>
            <IconButton onClick={this.previous}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton onClick={isPlaying ? this.pause : this.play}>
              { isPlaying
                ? <PauseCircleIcon />
                : <PlayArrowIcon />
              }
            </IconButton>
            <IconButton onClick={this.next}>
              <SkipNextIcon />
            </IconButton>
            <Tooltip title="Coming Soon" placement="top">
              <span>
                <IconButton disabled>
                  <ShuffleIcon />
                </IconButton>
              </span>
            </Tooltip>
          </div>
          <div className={classes.progressBar}>
            <Slider
              value={currentPosition}
              onChange={this.changeSliderPosition}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PopupPlayer);

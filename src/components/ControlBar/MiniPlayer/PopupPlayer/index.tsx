import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Store } from '../../../../store/types';

type Props = {
  songArtworkUrl: string;
  isPlaying: boolean;
  currentPosition: number;
  onChangePosition: (position: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const useStyles = makeStyles({
  cover: {
    width: 350,
    height: 350,
  },
  text: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  buttons: {
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  progressBar: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
  },
});

const PopupPlayer = (props: Props) => {
  const {
    songArtworkUrl, isPlaying, currentPosition, onChangePosition, onPlay, onPause, onPrevious, onNext,
  } = props;
  const { artist, album, song } = useSelector((state: Store) => state.player);
  const classes = useStyles();
  const onChangeSliderPosition = (event: React.ChangeEvent<any>, value: number | number[]) => {
    if (typeof value === 'number') {
      onChangePosition(value);
    }
  };

  return (
    <div>
      <CardMedia className={classes.cover} image={songArtworkUrl} />
      <div>
        <div className={classes.text}>
          <Typography variant="h5">
            {song.name}
          </Typography>
          <Typography variant="caption" display="block">
            {album.name}
          </Typography>
          <Typography variant="caption" display="block">
            {artist.name}
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
          <IconButton onClick={onPrevious}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton onClick={isPlaying ? onPause : onPlay}>
            { isPlaying
              ? <PauseCircleIcon />
              : <PlayArrowIcon />}
          </IconButton>
          <IconButton onClick={onNext}>
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
            onChange={onChangeSliderPosition}
          />
        </div>
      </div>
    </div>
  );
};

export default PopupPlayer;

import * as React from 'react';
import { connect } from 'react-redux';
import { setPlayerData, fetchSongFileUrl, fetchArtworkFileUrl } from '../../../store/player/actions';
import PopupPlayer from './PopupPlayer';
import {createStyles, withStyles} from "@material-ui/core/styles";
import CardMedia from '@material-ui/core/CardMedia';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import {Album, Artist, Song, Store} from "../../../store/types";
import ReactAudioPlayer from "react-audio-player";

type Props = {
  classes: Record<keyof typeof styles, string>;
  artist?: Artist;
  album?: Album;
  song?: Song;
  playlist?: Song[];
  songFileUrl?: string;
  artworkFileUrl?: string;
  setPlayerData?: (artist: Artist, album: Album, song: Song, playlist: Song[]) => void;
  fetchSongFileUrl?: (artistId: string, albumId: string, songId: string) => void;
  fetchArtworkFileUrl?: (artistId: string, albumId: string, songId: string) => void;
}

type State = {
  isPlaying: boolean;
  currentPosition: number;
  popupPlayerAnchorEl?: HTMLElement;
}

const styles = createStyles({
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 24,
    display: 'inline-block',
    verticalAlign: 'bottom'
  },
  popupPlayerButton: {
    padding: 0
  }
});

class MiniPlayer extends React.Component<Props, State> {
  audioNode?: ReactAudioPlayer;

  constructor(props: Props) {
    super(props);
    const { artist, album, song } = props;
    this.state = {
      isPlaying: true,
      currentPosition: 0
    };
    if (artist !== undefined && album !== undefined && song !== undefined) {
      this.load(artist.id, album.id, song.id);
    }
  }

  componentWillUpdate(nextProps: Props) {
    const { artist = {} as Artist, album = {} as Album, song = {} as Song } = this.props;
    const {
      artist: nextArtist = {} as Artist, album: nextAlbum = {} as Album, song: nextSong = {} as Song
    } = nextProps;

    if (artist.id !== nextArtist.id || album.id !== nextAlbum.id || song.id !== nextSong.id) {
      this.load(nextArtist.id, nextAlbum.id, nextSong.id);
    }
  }

  load = (artistId: string, albumId: string, songId: string) => {
    const { fetchSongFileUrl, fetchArtworkFileUrl } = this.props;
    if (this.audioNode !== undefined) {
      this.stop();
      this.setState({ currentPosition: 0 });
    }
    if (fetchSongFileUrl !== undefined) {
      fetchSongFileUrl(artistId, albumId, songId);
    }
    if (fetchArtworkFileUrl !== undefined) {
      fetchArtworkFileUrl(artistId, albumId, songId);
    }
  };

  play = () =>  {
    if (this.audioNode !== undefined) {
      this.audioNode.audioEl.play();
    }
    this.setState({ isPlaying: true });
  };

  stop = () => {
    if (this.audioNode !== undefined) {
      this.audioNode.audioEl.pause();
      this.audioNode.audioEl.currentTime = 0;
    }
  };

  pause = () => {
    if (this.audioNode !== undefined) {
      this.audioNode.audioEl.pause();
    }
    this.setState({ isPlaying: false });
  };

  previous = () => {
    const {
      artist = {} as Artist, album = {} as Album, song = {} as Song, playlist = [] as Song[],
      setPlayerData
    } = this.props;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].id === song.id && i > 0 && setPlayerData !== undefined) {
        setPlayerData(artist, album, playlist[i - 1], playlist);
        break;
      }
    }
  };

  next = () => {
    const {
      artist = {} as Artist, album = {} as Album, song = {} as Song, playlist = [] as Song[],
      setPlayerData
    } = this.props;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].id === song.id && i < playlist.length - 1 && setPlayerData !== undefined) {
        setPlayerData(artist, album, playlist[i + 1], playlist);
        break;
      }
    }
  };

  setAudioNode = (node: ReactAudioPlayer) => this.audioNode = node;
  setCurrentTrackedPosition = (position: number) => {
    let songLength = this.audioNode !== undefined ? this.audioNode.audioEl.duration : 1;
    this.setState({ currentPosition: position / songLength * 100 });
  };
  changeCurrentPosition = (position: number) => {
    if (this.audioNode !== undefined) {
      this.audioNode.audioEl.currentTime = (position * this.audioNode.audioEl.duration) / 100;
    }
    this.setState({ currentPosition: position });
  };

  handleOpenPopupPlayer = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ popupPlayerAnchorEl: event.currentTarget });
  };

  handleClosePopupPlayer = () => {
    this.setState({ popupPlayerAnchorEl: undefined });
  };

  render() {
    const { songFileUrl = "", artworkFileUrl = "", classes } = this.props;
    const { isPlaying, currentPosition, popupPlayerAnchorEl } = this.state;
    return (
      <div>
        <ReactAudioPlayer
          autoPlay
          src={songFileUrl}
          ref={this.setAudioNode}
          listenInterval={100}
          onListen={this.setCurrentTrackedPosition}
        />
        <IconButton>
          <SkipPreviousIcon onClick={this.previous} />
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
        <IconButton className={classes.popupPlayerButton} onClick={this.handleOpenPopupPlayer}>
          <CardMedia
            className={classes.artwork}
            image={artworkFileUrl}
          />
        </IconButton>
        <Popover
          open={popupPlayerAnchorEl != null}
          anchorEl={popupPlayerAnchorEl}
          onClose={this.handleClosePopupPlayer}
          anchorPosition={{ top: 500, left: 0 }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <PopupPlayer
            songArtworkUrl={artworkFileUrl}
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

const mapStateToProps = ({ player: playerStore }: Store) => {
  const { artist, album, song, playlist, songFileUrl, artworkFileUrl } = playerStore;
  return {
    artist: artist,
    album: album,
    song: song,
    playlist: playlist,
    songFileUrl: songFileUrl,
    artworkFileUrl: artworkFileUrl
  }
};

const mapDispatchToProps = {
  setPlayerData: setPlayerData,
  fetchSongFileUrl: fetchSongFileUrl,
  fetchArtworkFileUrl: fetchArtworkFileUrl
};

const StyledMiniPlayer = withStyles(styles)(MiniPlayer);
export default connect(mapStateToProps, mapDispatchToProps)(StyledMiniPlayer);

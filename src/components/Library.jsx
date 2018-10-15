import React from 'react';
import store from '../store';
import { SET_PLAYER } from '../store/player/actions';
import { FETCH_ARTISTS, SET_ARTIST, FETCH_ALBUMS, SET_ALBUM, FETCH_SONGS, SET_SONG } from '../store/library/actions';
import { connect } from 'react-redux';
import { findAllArtists, findAllAlbums, findAllSongs } from '../common/rest';
import { isEmpty } from '../common/functions';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%'
  },
  panelList: {
    overflowY: 'auto',
    maxHeight: '150px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Library extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedPanel: null
    };
    findAllArtists()
      .then(artists => store.dispatch({ type: FETCH_ARTISTS, payload: artists }));
  }

  setArtist = (artist) => {
    this.setState({ selectedPanel: false });
    store.dispatch({ type: SET_ARTIST, payload: artist });
    findAllAlbums(artist.id)
      .then(albums => store.dispatch({ type: FETCH_ALBUMS, payload: albums }));
  };

  setAlbum = (album) => {
    this.setState({ selectedPanel: false });
    store.dispatch({ type: SET_ALBUM, payload: album });
    findAllSongs(this.props.artist.id, album.id)
      .then(songs => store.dispatch({ type: FETCH_SONGS, payload: songs }));
  };

  setSong = (song) => {
    this.setState({ selectedPanel: false });
    store.dispatch({ type: SET_SONG, payload: song });
    store.dispatch({
      type: SET_PLAYER,
      payload: {
        artist: this.props.artist,
        album: this.props.album,
        song: song,
        playlist: this.props.songs
      }
    });
  };

  handlePanelSelection = (panel) => {
    this.setState({
      selectedPanel: this.state.selectedPanel !== panel
        ? panel
        : false
    });
  };

  createMediaList = (type, list) =>
    !isEmpty(list)
      ? <List component="nav">
          { list.map((item, index) =>
            <ListItem
              key={index}
              button
              onClick={
                type === 'artists'
                  ? () => this.setArtist(item)
                  : type === 'albums'
                    ? () => this.setAlbum(item)
                    : () => this.setSong(item)
              }
            >
              <ListItemText primary={item.name} />
            </ListItem>
          )}
        </List>
      : <LoadingIndicator />

  render() {
    const { artists, artist, albums, album, songs, song, classes } = this.props;
    const { selectedPanel } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={selectedPanel === 'artistPanel'}
          onChange={() => this.handlePanelSelection('artistPanel')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Artist
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {artist.name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelList}>
            {this.createMediaList('artists', artists)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={selectedPanel === 'albumPanel'}
          onChange={() => this.handlePanelSelection('albumPanel')}
          disabled={isEmpty(artist)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Album
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {album.name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelList}>
            {this.createMediaList('albums', this.props.albums)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={selectedPanel === 'songPanel'}
          onChange={() => this.handlePanelSelection('songPanel')}
          disabled={isEmpty(artist) || isEmpty(album)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Song
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {song.name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelList}>
            {this.createMediaList('songs', songs)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const LoadingIndicator = () => (
  <Grid container justify="center">
    <CircularProgress />
  </Grid>
);

const mapStateToProps = state => {
  return {
    artists: state.library.artists,
    artist: state.library.artist,
    albums: state.library.albums,
    album: state.library.album,
    songs: state.library.songs,
    song: state.library.song
  };
}
const LibraryWithStyles = withStyles(styles)(Library);
export default connect(mapStateToProps)(LibraryWithStyles);

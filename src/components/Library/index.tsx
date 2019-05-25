import * as React from 'react';
import { setPlayerData } from '../../store/player/actions';
import { fetchArtists, fetchAlbums, fetchSongs, setArtist, setAlbum, setSong } from '../../store/library/actions';
import { connect } from 'react-redux';
import { isEmpty } from '../../common/functions';
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
    overflowY: 'auto' as 'auto',
    maxHeight: '150px' as '150px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%' as '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Library extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      selectedPanel: null
    };
  }

  componentDidMount() {
    this.props.fetchArtists();
  }

  setArtist = (artist) => {
    this.setState({ selectedPanel: false });
    this.props.setArtist(artist);
    this.props.fetchAlbums(artist.id);
  };

  setAlbum = (album) => {
    this.setState({ selectedPanel: false });
    this.props.setAlbum(album);
    this.props.fetchSongs(this.props.artist.id, album.id);
  };

  setSong = (song) => {
    const { artist, album, songs } = this.props;
    this.setState({ selectedPanel: false });
    this.props.setSong(song);
    this.props.setPlayerData(artist, album, song, songs);
  };

  handlePanelSelection = (panel) => {
    this.setState({
      selectedPanel: this.state.selectedPanel !== panel
        ? panel
        : false
    });
  };

  createMediaList = (type, list) => (
    !isEmpty(list)
      ? <List component="nav">
          { list.map((item, index) => (
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
              <ListItemText secondary={item.name} />
            </ListItem>
          ))}
        </List>
      : <LoadingIndicator />
  );

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
            {this.createMediaList('albums', albums)}
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

const mapStateToProps = ({ library }) => ({
  artists: library.artists,
  artist: library.artist,
  albums: library.albums,
  album: library.album,
  songs: library.songs,
  song: library.song
});

const mapDispatchToProps = {
  fetchArtists: fetchArtists,
  fetchAlbums: fetchAlbums,
  fetchSongs: fetchSongs,
  setArtist: setArtist,
  setAlbum: setAlbum,
  setSong: setSong,
  setPlayerData: setPlayerData
};

const LibraryWithStyles = withStyles(styles, { withTheme: true })(Library);
export default connect(mapStateToProps, mapDispatchToProps)(LibraryWithStyles);

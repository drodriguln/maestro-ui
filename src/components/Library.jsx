import React from 'react';
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
      artists: [],
      albums: [],
      songs: [],
      selectedArtist: {},
      selectedAlbum: {},
      selectedSong: {},
      selectedPanel: null
    };
    findAllArtists()
      .then(artists => this.setState({ artists }));
  }

  setArtist = (artist) => {
    this.setState({
      selectedArtist: artist,
      selectedAlbum: {},
      albums: [],
      selectedSong: {},
      songs: [],
      selectedPanel: false
    });
    findAllAlbums(artist.id)
      .then(albums => this.setState({ albums }));
  };

  setAlbum = (album) => {
    this.setState({
      selectedAlbum: album,
      selectedSong: {},
      songs: [],
      selectedPanel: false
    });
    findAllSongs(this.state.selectedArtist.id, album.id)
      .then(songs => this.setState({ songs }));
  }

  setSong = (song) => {
    this.setState({
      selectedSong: song,
      selectedPanel: false
    });
    this.props.onSelect(this.state.selectedArtist, this.state.selectedAlbum, song);
  }

  handlePanelSelection = (panel) => {
    this.setState({
      selectedPanel: this.state.selectedPanel != panel
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
                type == 'artists'
                  ? () => this.setArtist(item)
                  : type == 'albums'
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
    const { classes } = this.props;
    const { selectedPanel } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={selectedPanel == 'artistPanel'}
          onChange={() => this.handlePanelSelection('artistPanel')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Artist
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {this.state.selectedArtist.name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelList}>
            {this.createMediaList('artists', this.state.artists)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={selectedPanel == 'albumPanel'}
          onChange={() => this.handlePanelSelection('albumPanel')}
          disabled={isEmpty(this.state.selectedArtist)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Album
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {this.state.selectedAlbum.name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelList}>
            {this.createMediaList('albums', this.state.albums)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={selectedPanel == 'songPanel'}
          onChange={() => this.handlePanelSelection('songPanel')}
          disabled={isEmpty(this.state.selectedArtist) || isEmpty(this.state.selectedAlbum)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Song
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {this.state.selectedSong.name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelList}>
            {this.createMediaList('songs', this.state.songs)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const LoadingIndicator = () =>
  <Grid container justify="center">
    <CircularProgress />
  </Grid>

export default withStyles(styles)(Library);

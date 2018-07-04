import React from 'react';
import { findAllArtists, findAllAlbums, findAllSongs } from '../common/rest';
import { isEmpty } from '../common/functions';
import PropTypes from 'prop-types';
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
    width: '100%',
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
      expanded: null,
      artists: [],
      albums: [],
      songs: [],
      selectedArtist: {},
      selectedAlbum: {},
      selectedSong: {}
    };
    findAllArtists()
      .then(artists => this.setState({ artists }));
  }

  setArtist = (selectedArtist) => {
    this.setState({ selectedArtist, expanded: false });
    findAllAlbums(selectedArtist.id)
      .then(albums => this.setState({ albums }));
  };

  setAlbum = (selectedAlbum) => {
    this.setState({ selectedAlbum, expanded: false });
    findAllSongs(this.state.selectedArtist.id, selectedAlbum.id)
      .then(songs => this.setState({ songs }));
  }

  setSong = (selectedSong) => {
    this.setState({ selectedSong, expanded: false });
  }

  handleChange = panel => (event, expanded) => {
    this.setState({ expanded: expanded ? panel : false });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Artist</Typography>
            <Typography className={classes.secondaryHeading}>{this.state.selectedArtist.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            { !isEmpty(this.state.artists)
              ? <List component="nav">
                  { this.state.artists.map((artist, index) =>
                    <ListItem key={index} onClick={() => this.setArtist(artist)} button>
                      <ListItemText primary={artist.name} />
                    </ListItem>
                  )}
                </List>
              : <LoadingIndicator />
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === 'panel2'}
          onChange={this.handleChange('panel2')}
          disabled={isEmpty(this.state.selectedArtist)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Album</Typography>
            <Typography className={classes.secondaryHeading}>{this.state.selectedAlbum.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            { !isEmpty(this.state.albums)
              ? <List component="nav">
                  { this.state.albums.map((album, index) =>
                    <ListItem key={index} onClick={() => this.setAlbum(album)} button>
                      <ListItemText primary={album.name} />
                    </ListItem>
                  )}
                </List>
              : <LoadingIndicator />
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === 'panel3'}
          onChange={this.handleChange('panel3')}
          disabled={isEmpty(this.state.selectedAlbum)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Song</Typography>
            <Typography className={classes.secondaryHeading}>{this.state.selectedSong.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            { !isEmpty(this.state.songs)
              ? <List component="nav">
                  { this.state.songs.map((song, index) =>
                    <ListItem key={index} onClick={() => this.setSong(song)} button>
                      <ListItemText primary={song.name} />
                    </ListItem>
                  )}
                </List>
              : <LoadingIndicator />
            }
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

Library.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Library);

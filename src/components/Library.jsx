import React from 'react';
import { findAllArtists } from '../common/rest';
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
      selectedArtist: {}
    };
    findAllArtists()
      .then(artists => this.setState({ artists }));
  }

  setArtist = (selectedArtist) => {
    this.setState({ selectedArtist, expanded: false });
  };

  handleChange = panel => (event, expanded) => {
    this.setState({ expanded: expanded ? panel : false });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Artist</Typography>
            <Typography className={classes.secondaryHeading}>{this.state.selectedArtist.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List component="nav">
              { this.state.artists.map((artist, index) =>
                <ListItem key={index} onClick={() => this.setArtist(artist)} button>
                  <ListItemText primary={artist.name} />
                </ListItem>
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Album</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Song</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

Library.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Library);

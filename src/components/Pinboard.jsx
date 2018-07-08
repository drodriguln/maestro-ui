import React from 'react';
import Library from './Library';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles/index";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
});

const Pinboard = (props) =>
  props.pin === 'library'
    ? <Library
        onSelect={(playlist, songInfo) => props.onLibrarySelect(playlist, songInfo)}
      />
    : <Paper className={props.classes.paper} elevation={1}>
        <Typography variant="headline">
          Select a song to get started.
        </Typography>
          <br/>
        <Typography>
          The main menu can be accessed in the top left. Currently, editing and uploading songs is unsupported,
          but there are four free-domain songs from esteemed composers to choose from.
        </Typography>
          <br/>
        <Typography>
          After selecting a song, be sure to click the artwork button to expand the full music player. Enjoy!
        </Typography>
      </Paper>;

export default withStyles(styles)(Pinboard);

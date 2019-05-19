import * as React from 'react';
import Library from '../Library';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

/*
 * To be replaced with React Router implementation when
 * file upload and edit library options are added.
 */

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
});

const Pinboard = (props) => (
  props.pin === 'library'
    ? <Library />
    : <Paper className={props.classes.paper} elevation={1}>
        <Typography variant="h5">
          Select a song to get started.
        </Typography>
          <br/>
        <Typography>
          The main menu can be accessed in the top left. Currently, editing and uploading songs is unsupported,
          but there are some free-domain songs available to try out.
        </Typography>
          <br/>
        <Typography>
          After selecting a song, be sure to click the artwork button to expand the full music player. Oh, and feel free to toy around with the theme colors in settings. Enjoy!
        </Typography>
      </Paper>
);

export default withStyles(styles)(Pinboard);

import React from 'react';
import Library from '../Library';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Pin} from "../enum";

/*
 * TO DO: Replace implementation with React Router implementation.
 */

type Props = {
  pin: Pin;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2)
  },
}));

const Pinboard = ({ pin }: Props) => {
  const classes = useStyles();
  return (
    pin === Pin.LIBRARY
      ? <Library />
      : <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Select a song to get started.
        </Typography>
        <Typography>
          The main menu can be accessed in the top left. After selecting a song, be sure to click the artwork button to expand the full music player.
        </Typography>
      </Paper>
  );
};

export default Pinboard;

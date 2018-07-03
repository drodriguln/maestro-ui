import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryIcon from '@material-ui/icons/CloudCircle';
import UploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
});

const NavigationDrawer = (props) => {
  return (
    <Drawer
      open={props.isOpen}
      onClose={props.onClose}
    >
      <List component="nav">
        <ListItem onClick={props.onClose} button>
          <ListItemIcon>
            <LibraryIcon />
          </ListItemIcon>
          <ListItemText primary="Music Library" />
        </ListItem>
        <ListItem onClick={props.onClose} button>
          <ListItemIcon>
            <UploadIcon />
          </ListItemIcon>
          <ListItemText primary="File Upload" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default withStyles(styles)(NavigationDrawer);

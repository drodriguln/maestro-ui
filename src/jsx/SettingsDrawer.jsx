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
import {
  amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple,
  green, grey, indigo, lightBlue, lightGreen, lime, orange, pink,
  purple, red, teal, yellow
  } from '@material-ui/core/colors';

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
});

const SettingsDrawer = (props) => {

  const colors = [
    {name: "Amber", value: amber},
    {name: "Blue", value: blue},
    {name: "Blue Gray", value: blueGrey},
    {name: "Brown", value: brown},
    {name: "Cyan", value: cyan},
    {name: "Deep Orange", value: deepOrange},
    {name: "Deep Purple", value: deepPurple},
    {name: "Green", value: green},
    {name: "Gray", value: grey},
    {name: "Indigo", value: indigo},
    {name: "Light Blue", value: lightBlue},
    {name: "Light Green", value: lightGreen},
    {name: "Lime", value: lime},
    {name: "Orange", value: orange},
    {name: "Pink", value: pink},
    {name: "Purple", value: purple},
    {name: "Red", value: red},
    {name: "Teal", value: teal},
    {name: "Yellow", value: yellow}
  ];

  const list = colors.map((color, index) =>
    <ListItem key={index} onClick={() => props.onThemeColorSelect(color.value)} button>
      <ListItemText primary={color.name} />
    </ListItem>
  );

  return (
    <Drawer
      open={props.isOpen}
      onClose={props.onClose}
      anchor="right"
    >
      <List component="nav">
        {list}
      </List>
    </Drawer>
  )
}

export default withStyles(styles)(SettingsDrawer);

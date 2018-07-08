import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import { withStyles } from "@material-ui/core/styles/index";
import {
    amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple,
    green, grey, indigo, lightBlue, lightGreen, lime, orange, pink,
    purple, red, teal, yellow
  } from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
});

const paletteColors = [
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

class SettingsDrawer extends React.Component {

  constructor(props) {
    super(props);
  }

  handleThemeTypeToggle = () => {
    this.props.onPaletteTypeSelect(
      this.props.themePalette.type === 'dark'
        ? 'light'
        : 'dark'
    );
  }

  createThemeTypeList = () =>
    <List subheader={<ListSubheader>Theme Type</ListSubheader>}>
      <ListItem>
        <ListItemText primary="Dark" />
        <ListItemSecondaryAction>
          <Switch
            onChange={this.handleThemeTypeToggle}
            checked={this.props.themePalette.type === 'dark'}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>

  createThemeColorList = () =>
      <List subheader={<ListSubheader>Theme Colors</ListSubheader>}>
        { paletteColors.map((color, index) =>
          <ListItem
            button
            key={index}
            onClick={() => this.props.onPaletteColorSelect(color.value)}
          >
            <ListItemText primary={color.name} />
          </ListItem>
        )}
      </List>

  render() {
    return (
      <div className={this.props.classes.root}>
      <Drawer open={this.props.isOpen} onClose={this.props.onClose}>
          {this.createThemeTypeList()}
          {this.createThemeColorList()}
      </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(SettingsDrawer);

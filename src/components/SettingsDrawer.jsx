import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import { withStyles } from "@material-ui/core/styles/index";
import {
    amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple,
    green, grey, indigo, lightBlue, lightGreen, lime, orange, pink,
    purple, red, teal, yellow
  } from '@material-ui/core/colors';

const styles = theme => ({
  list: {
    width: 300
  },
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
    <List className={this.props.classes.list} subheader={<ListSubheader disableSticky>Theme Type</ListSubheader>}>
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
      <List className={this.props.classes.list} subheader={<ListSubheader disableSticky>Theme Colors</ListSubheader>}>
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
      <Drawer open={this.props.isOpen} onClose={this.props.onClose}>
        <List className={this.props.classes.list}>
          <ListItem onClick={this.props.onClose} button>
            <ListItemIcon>
              <BackIcon />
            </ListItemIcon>
            <ListItemText primary="Back"/>
          </ListItem>
        </List>
        <Divider />
        {this.createThemeTypeList()}
        {this.createThemeColorList()}
      </Drawer>
    )
  }
}

export default withStyles(styles)(SettingsDrawer);

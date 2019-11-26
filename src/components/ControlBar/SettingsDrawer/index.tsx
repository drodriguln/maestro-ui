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
import { makeStyles } from "@material-ui/core/styles";
import {
  amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple,
  green, grey, indigo, lightBlue, lightGreen, lime, orange, pink,
  purple, red, teal, yellow
} from '@material-ui/core/colors';
import {PaletteOptions} from "@material-ui/core/styles/createPalette";
import {Color} from "@material-ui/core";

type Props = {
  themePalette: PaletteOptions;
  isOpen: boolean;
  onPaletteTypeSelect: (type: string) => void;
  onPaletteColorSelect: (color: Color) => void;
  onClose: () => void;
}

const useStyles = makeStyles({
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

const SettingsDrawer = ({themePalette, isOpen, onPaletteTypeSelect, onPaletteColorSelect, onClose}: Props) => {
  const classes = useStyles();
  const handleThemeTypeToggle = () => onPaletteTypeSelect(themePalette.type === 'dark' ? 'light' : 'dark');
  const createThemeTypeList = () => (
    <List
      className={classes.list}
      subheader={<ListSubheader disableSticky>Theme Type</ListSubheader>}
      dense
    >
      <ListItem>
        <ListItemText primary="Dark" />
        <ListItemSecondaryAction>
          <Switch
            color="primary" checked={themePalette.type === 'dark'}
            onChange={handleThemeTypeToggle}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
  const createThemeColorList = () => (
    <List
      className={classes.list}
      subheader={<ListSubheader disableSticky>Theme Colors</ListSubheader>}
      dense
    >
      { paletteColors.map((color, index) =>
        <ListItem
          button
          key={index}
          onClick={() => onPaletteColorSelect(color.value)}
        >
          <ListItemText
            primary={color.name}
            secondary={color.value === themePalette.primary ? "Selected" : null}
          />
        </ListItem>
      )}
    </List>
  );

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <List className={classes.list}>
        <ListItem onClick={onClose} button>
          <ListItemIcon>
            <BackIcon />
          </ListItemIcon>
          <ListItemText primary="Back"/>
        </ListItem>
      </List>
      <Divider />
      {createThemeTypeList()}
      {createThemeColorList()}
    </Drawer>
  );
};

export default SettingsDrawer;

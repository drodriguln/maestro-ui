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
import {Color} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "../../../store/types";
import {setThemePaletteColor, setThemePaletteType} from "../../../store/theme/actions";

type Props = {
  isOpen: boolean;
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

const SettingsDrawer = ({isOpen, onClose}: Props) => {
  const theme = useSelector((state: Store) => state.theme);
  const dispatch = useDispatch();
  const classes = useStyles();
  const toggleThemePaletteType = () => {
    if (theme.palette !== undefined) {
      dispatch(setThemePaletteType(theme.palette.type === 'dark' ? 'light' : 'dark'));
    }
  };
  const selectThemePaletteColor = (color: Color) => {
    if (theme.palette !== undefined) {
      dispatch(setThemePaletteColor(color))
    }
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <List className={classes.list}>
        <ListItem onClick={onClose} button>
          <ListItemIcon>
            <BackIcon />
          </ListItemIcon>
          <ListItemText primary="Back" />
        </ListItem>
      </List>
      <Divider />
      <List
        className={classes.list}
        subheader={<ListSubheader disableSticky>Theme Type</ListSubheader>}
        dense
      >
        <ListItem>
          <ListItemText primary="Dark" />
          <ListItemSecondaryAction>
            <Switch
              color="primary" checked={theme.palette !== undefined && theme.palette.type === 'dark'}
              onChange={toggleThemePaletteType}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <List
        className={classes.list}
        subheader={<ListSubheader disableSticky>Theme Colors</ListSubheader>}
        dense
      >
        { paletteColors.map((color, index) =>
          <ListItem
            button
            key={index}
            onClick={() => selectThemePaletteColor(color.value)}
          >
            <ListItemText
              primary={color.name}
              secondary={theme.palette !== undefined && color.value === theme.palette.primary ? "Selected" : undefined}
            />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default SettingsDrawer;

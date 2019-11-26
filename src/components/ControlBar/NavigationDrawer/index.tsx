import React from 'react';
import SettingsDrawer from '../SettingsDrawer';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import LibraryIcon from '@material-ui/icons/CloudCircle';
import EditIcon from '@material-ui/icons/Create';
import UploadIcon from '@material-ui/icons/CloudUpload';
import SettingsIcon from '@material-ui/icons/Settings';
import SubMenuIcon from '@material-ui/icons/KeyboardArrowRight';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import {makeStyles} from "@material-ui/core/styles";
import {Pin} from "../../enum";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (pin: Pin) => void;
}

const useStyles = makeStyles({
  list: {
    width: 300
  },
});

const NavigationDrawer = (props: Props) => {
  const { isOpen, onClose, onSelect } = props;
  const [isSettingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  const classes = useStyles();
  const openSettingsDrawer = () => setSettingsDrawerOpen(true);
  const closeSettingsDrawer = () => setSettingsDrawerOpen(false);

  return (
    <div>
      <Drawer open={isOpen} onClose={onClose}>
        <List className={classes.list}>
          <ListItem onClick={onClose} button>
            <ListItemIcon><BackIcon/></ListItemIcon>
            <ListItemText primary="Close" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" className={classes.list} dense>
          <ListItem onClick={() => onSelect(Pin.LIBRARY)} button>
            <ListItemIcon><LibraryIcon/></ListItemIcon>
            <ListItemText primary="Music Library" />
          </ListItem>
          <Tooltip title="Coming Soon" placement="right">
            <div>
              <ListItem button disabled>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Library" />
              </ListItem>
            </div>
          </Tooltip>
          <Tooltip title="Coming Soon" placement="right">
            <div>
              <ListItem button disabled>
                <ListItemIcon>
                  <UploadIcon />
                </ListItemIcon>
                <ListItemText primary="File Upload" />
              </ListItem>
            </div>
          </Tooltip>
          <ListItem onClick={openSettingsDrawer} button>
            <ListItemIcon><SettingsIcon/></ListItemIcon>
            <ListItemText primary="Settings" />
            <ListItemIcon><SubMenuIcon/></ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
      <SettingsDrawer isOpen={isSettingsDrawerOpen} onClose={closeSettingsDrawer} />
    </div>
  );
};

export default NavigationDrawer;
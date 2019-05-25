import * as React from 'react';
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
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  list: {
    width: 300
  },
});

class NavigationDrawer extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      isSettingsDrawerOpen: false
    }
  }

  openSettingsDrawer = () => this.setState({ isSettingsDrawerOpen: true });
  closeSettingsDrawer = () => this.setState({ isSettingsDrawerOpen: false });
  handlePaletteTypeSelect = (type) => this.props.onPaletteTypeSelect(type);
  handlePaletteColorSelect = (color) => this.props.onPaletteColorSelect(color);

  render() {
    const { isOpen, onClose, onSelect, classes, themePalette } = this.props;
    return (
      <div>
        <Drawer open={isOpen} onClose={onClose}>
          <List className={classes.list}>
            <ListItem onClick={onClose} button>
              <ListItemIcon><BackIcon/></ListItemIcon>
              <ListItemText primary="Close"/>
            </ListItem>
          </List>
          <Divider />
          <List component="nav" className={classes.list} dense>
            <ListItem onClick={() => onSelect('library')} button>
              <ListItemIcon><LibraryIcon/></ListItemIcon>
              <ListItemText primary="Music Library"/>
            </ListItem>
            <Tooltip title="Coming Soon" placement="left">
              <span>
                <ListItem button disabled>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit Library"/>
                </ListItem>
              </span>
            </Tooltip>
            <Tooltip title="Coming Soon" placement="left">
              <span>
                <ListItem button disabled>
                  <ListItemIcon>
                    <UploadIcon />
                  </ListItemIcon>
                  <ListItemText primary="File Upload"/>
                </ListItem>
              </span>
            </Tooltip>
            <ListItem onClick={this.openSettingsDrawer} button>
              <ListItemIcon><SettingsIcon/></ListItemIcon>
              <ListItemText primary="Settings"/>
              <ListItemIcon><SubMenuIcon/></ListItemIcon>
            </ListItem>
          </List>
        </Drawer>
        <SettingsDrawer
          className={classes.list}
          isOpen={this.state.isSettingsDrawerOpen}
          themePalette={themePalette}
          onClose={this.closeSettingsDrawer}
          onPaletteTypeSelect={this.handlePaletteTypeSelect}
          onPaletteColorSelect={this.handlePaletteColorSelect}
        />
      </div>
    );
  }
}

export default withStyles(styles)(NavigationDrawer);

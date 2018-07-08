import React from 'react';
import SettingsDrawer from './SettingsDrawer';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LibraryIcon from '@material-ui/icons/CloudCircle';
import UploadIcon from '@material-ui/icons/CloudUpload';
import SettingsIcon from '@material-ui/icons/Settings';
import SubMenuIcon from '@material-ui/icons/KeyboardArrowRight';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import { withStyles } from "@material-ui/core/styles/index";

const styles = theme => ({
  list: {
    width: 300
  },
});

class NavigationDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSettingsDrawerOpen: false
    }
  }

  openSettingsDrawer = () => this.setState({ isSettingsDrawerOpen: true });
  closeSettingsDrawer = () => this.setState({ isSettingsDrawerOpen: false });

  handlePaletteTypeSelect = (type) => {
    this.props.onPaletteTypeSelect(type);
  }

  handlePaletteColorSelect = (color) => {
    this.props.onPaletteColorSelect(color);
    this.closeSettingsDrawer();
  }

  render() {
    const { isOpen, onClose, onSelect, classes } = this.props;
    return (
      <div>
        <Drawer open={isOpen} onClose={onClose}>
          <List className={this.props.classes.list}>
            <ListItem onClick={this.props.onClose} button>
              <ListItemIcon>
                <BackIcon />
              </ListItemIcon>
              <ListItemText primary="Close"/>
            </ListItem>
          </List>
          <Divider />
          <List component="nav" className={classes.list}>
            <ListItem onClick={() => onSelect('library')} button>
              <ListItemIcon>
                <LibraryIcon />
              </ListItemIcon>
              <ListItemText primary="Music Library"/>
            </ListItem>
            <ListItem onClick={() => onSelect('upload')} button>
              <ListItemIcon>
                <UploadIcon />
              </ListItemIcon>
              <ListItemText primary="File Upload"/>
            </ListItem>
            <ListItem onClick={this.openSettingsDrawer} button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings"/>
              <ListItemIcon>
                <SubMenuIcon />
              </ListItemIcon>
            </ListItem>
          </List>
        </Drawer>
        <SettingsDrawer
          className={classes.list}
          isOpen={this.state.isSettingsDrawerOpen}
          themePalette={this.props.themePalette}
          onClose={this.closeSettingsDrawer}
          onPaletteTypeSelect={this.handlePaletteTypeSelect}
          onPaletteColorSelect={this.handlePaletteColorSelect}
        />
      </div>
    )
  }
}

export default withStyles(styles)(NavigationDrawer);

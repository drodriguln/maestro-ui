import React from 'react';
import { isEmpty } from '../common/functions';
import NavigationDrawer from './NavigationDrawer';
import SettingsDrawer from './SettingsDrawer';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import MiniPlayer from './MiniPlayer';

const styles = theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  settingsButton: {
    marginRight: -12
  }
});

class NavigationBar extends React.Component {

  constructor() {
    super();
    this.state = {
      isNavigationDrawerOpen: false,
      isSettingsDrawerOpen: false
    };
  }

  openNavigationDrawer = () => this.setState({ isNavigationDrawerOpen: true });
  closeNavigationDrawer = () => this.setState({ isNavigationDrawerOpen: false });
  openSettingsDrawer = () => this.setState({ isSettingsDrawerOpen: true });
  closeSettingsDrawer = () => this.setState({ isSettingsDrawerOpen: false });

  setNavigationSelection = (selection) => {
    this.closeNavigationDrawer();
    this.props.onNavigationSelect(selection);
  }

  setPaletteType = (type) => {
    this.closeSettingsDrawer();
    this.props.onPaletteTypeSelect(type);
  }

  setPaletteColor = (color) => {
    this.closeSettingsDrawer();
    this.props.onPaletteColorSelect(color);
  }

  render() {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              className={this.props.classes.menuButton}
              color="inherit"
              onClick={this.openNavigationDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={this.props.classes.flex}
              variant="title"
              color="inherit"
            >
              Maestro
            </Typography>
            { !isEmpty(this.props.songInfo)
              ? <MiniPlayer songInfo={this.props.songInfo} />
              : <span />
            }
            <IconButton
              className={this.props.classes.settingsButton}
              color="inherit"
              onClick={this.openSettingsDrawer}
            >
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <NavigationDrawer
          isOpen={this.state.isNavigationDrawerOpen}
          onSelect={this.setNavigationSelection}
          onClose={this.closeNavigationDrawer}
        />
        <SettingsDrawer
          isOpen={this.state.isSettingsDrawerOpen}
          onClose={this.closeSettingsDrawer}
          onPaletteTypeSelect={this.setPaletteType}
          onPaletteColorSelect={this.setPaletteColor}
        />
      </div>
    )
  }
}

export default withStyles(styles)(NavigationBar);

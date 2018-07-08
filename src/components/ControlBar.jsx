import React from 'react';
import { isEmpty } from '../common/functions';
import NavigationDrawer from './NavigationDrawer';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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

class ControlBar extends React.Component {

  constructor() {
    super();
    this.state = {
      isNavigationDrawerOpen: false
    };
  }

  openNavigationDrawer = () => this.setState({ isNavigationDrawerOpen: true });
  closeNavigationDrawer = () => this.setState({ isNavigationDrawerOpen: false });
  setPaletteType = (type) => this.props.onPaletteTypeSelect(type);
  setPaletteColor = (color) => this.props.onPaletteColorSelect(color);

  setNavigationSelection = (selection) => {
    this.closeNavigationDrawer();
    this.props.onNavigationSelect(selection);
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
              ? <MiniPlayer
                  playlist={this.props.playlist}
                  songInfo={this.props.songInfo}
                  onSongChange={this.props.onSongChange}
                />
              : <span />
            }
          </Toolbar>
        </AppBar>
        <NavigationDrawer
          isOpen={this.state.isNavigationDrawerOpen}
          themePalette={this.props.themePalette}
          onSelect={this.setNavigationSelection}
          onPaletteTypeSelect={this.setPaletteType}
          onPaletteColorSelect={this.setPaletteColor}
          onClose={this.closeNavigationDrawer}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ControlBar);
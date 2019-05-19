import * as React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '../../common/functions';
import NavigationDrawer from '../NavigationDrawer';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MiniPlayer from '../MiniPlayer';

const styles = () => ({
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

class ControlBar extends React.Component<any, any> {

  constructor(props) {
    super(props);
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
  };

  render() {
    const { isNavigationDrawerOpen } = this.state;
    const { player, classes, themePalette } = this.props;
    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={this.openNavigationDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.flex}
              variant="h6"
              color="inherit"
            >
              Maestro
            </Typography>
            { !isEmpty(player.song)
              ? <MiniPlayer />
              : <span />
            }
          </Toolbar>
        </AppBar>
        <NavigationDrawer
          isOpen={isNavigationDrawerOpen}
          themePalette={themePalette}
          onSelect={this.setNavigationSelection}
          onPaletteTypeSelect={this.setPaletteType}
          onPaletteColorSelect={this.setPaletteColor}
          onClose={this.closeNavigationDrawer}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  player: player
});

const ControlBarWithStyles = withStyles(styles)(ControlBar);
export default connect(mapStateToProps)(ControlBarWithStyles);

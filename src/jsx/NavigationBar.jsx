import React from 'react';
import NavigationDrawer from './NavigationDrawer';
import SettingsDrawer from './SettingsDrawer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';

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

  render() {
    const {classes} = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" onClick={() => this.setState({ isNavigationDrawerOpen: true })}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.flex} variant="title" color="inherit">
              Maestro
            </Typography>
            <IconButton className={classes.settingsButton} color="inherit" onClick={() => this.setState({ isSettingsDrawerOpen: true })}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <NavigationDrawer isOpen={this.state.isNavigationDrawerOpen} onClose={() => this.setState({ isNavigationDrawerOpen: false })} />
        <SettingsDrawer
          isOpen={this.state.isSettingsDrawerOpen}
          onClose={() => this.setState({ isSettingsDrawerOpen: false })}
          onThemeColorSelect={(color) => {
            this.setState({ isSettingsDrawerOpen: false });
            this.props.onThemeColorSelect(color);
          }}
        />
      </div>
    )
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavigationBar);

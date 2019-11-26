import React from 'react';
import {useSelector} from 'react-redux';
import isEmpty from 'is-empty';
import NavigationDrawer from './NavigationDrawer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MiniPlayer from './MiniPlayer';
import {Pin} from "../enum";
import {Store} from "../../store/types";

type Props = {
  onNavigationSelect: (pin: Pin) => void;
}

const useStyles = makeStyles({
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

const ControlBar = (props: Props) => {
  const { onNavigationSelect } = props;
  const [isNavigationDrawerOpen, setNavigationDrawerOpen] = React.useState(false);
  const classes = useStyles();
  const player = useSelector((state: Store) => state.player);
  const openNavigationDrawer = () => setNavigationDrawerOpen(true);
  const closeNavigationDrawer = () => setNavigationDrawerOpen(false);
  const setNavigationSelection = (selection: Pin) => {
    closeNavigationDrawer();
    onNavigationSelect(selection);
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={openNavigationDrawer}
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
        onSelect={setNavigationSelection}
        onClose={closeNavigationDrawer}
      />
    </div>
  );
};

export default ControlBar;
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';
import ControlBar from './ControlBar';
import Pinboard from './Pinboard';
import { Pin } from './enum';
import { Store } from '../store/types';

const Main = () => {
  const [pin, setPin] = React.useState(Pin.START_SCREEN);
  const theme = useSelector((state: Store) => state.theme);
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <ControlBar onNavigationSelect={setPin} />
      <Pinboard pin={pin} />
    </MuiThemeProvider>
  );
};

export default Main;

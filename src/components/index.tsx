import React from 'react';
import ControlBar from './ControlBar';
import Pinboard from './Pinboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { Pin } from "./enum";
import {Color} from "@material-ui/core";

const defaultThemePalette = {
  primary: blueGrey,
  type: 'dark'
} as PaletteOptions;

const Main = () => {
  const [pin, setPin] = React.useState(Pin.START_SCREEN);
  const [themePalette, setThemePalette] = React.useState(defaultThemePalette);
  const theme = { palette: themePalette } as ThemeOptions;
  const setPaletteType = (type: string) => setThemePalette({...themePalette, type: type} as PaletteOptions);
  const setPaletteColor = (color: Color) => setThemePalette({...themePalette, primary: color} as PaletteOptions);

  //Hack to get background color to adjust with theme change.
  document.body.style.backgroundColor = theme.palette && theme.palette.type === 'dark' ? '#303030' : '#FAFAFA';

  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <ControlBar
        themePalette={themePalette}
        onNavigationSelect={setPin}
        onPaletteTypeSelect={setPaletteType}
        onPaletteColorSelect={setPaletteColor}
      />
      <Pinboard pin={pin} />
    </MuiThemeProvider>
  );
};

export default Main;
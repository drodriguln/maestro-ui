import React from 'react';
import ControlBar from './ControlBar';
import Pinboard from './Pinboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

export default class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      pin: '',
      theme: {
        palette: {
          type: 'dark',
          primary: pink
        }
      }
    }
  }

  setPin = (pin) => {
    this.setState({ pin });
  };

  setPaletteType = (type) => {
    let theme = this.state.theme;
    theme.palette.type = type;
    this.setState({ theme });
  };

  setPaletteColor = (color) => {
    let theme = this.state.theme;
    theme.palette.primary = color;
    this.setState({ theme });
  };

  render() {
    //Hack to get background color to adjust with theme change.
    document.body.style.backgroundColor =
      this.state.theme.palette.type === 'dark'
        ? '#303030'
        : '#FAFAFA';
    return (
      <MuiThemeProvider theme={createMuiTheme(this.state.theme)}>
        <ControlBar
          themePalette={this.state.theme.palette}
          onNavigationSelect={this.setPin}
          onPaletteTypeSelect={this.setPaletteType}
          onPaletteColorSelect={this.setPaletteColor}
        />
        <br /><br /><br /><br />
        <Pinboard
          pin={this.state.pin}
          onLibrarySelect={this.setPlayerData}
        />
      </MuiThemeProvider>
    );
  }
}

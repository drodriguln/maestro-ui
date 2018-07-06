import React from 'react';
import NavigationBar from './NavigationBar';
import Pinboard from './Pinboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

export default class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      songInfo: {},
      pin: 'library',
      theme: {
        palette: {
          type: 'light',
          primary: pink
        }
      }
    }
  }

  setSongInfo = (artist, album, song) => {
    this.setState({
      songInfo: {
        artist: artist,
        album: album,
        song: song
      }
    });
  }

  setPin = (pin) => {
    this.setState({ pin });
  }

  setPaletteType = (type) => {
    let theme = this.state.theme;
    theme.palette.type = type;
    this.setState({ theme });
  }

  setPaletteColor = (color) => {
    let theme = this.state.theme;
    theme.palette.primary = color;
    this.setState({ theme });
  }

  render() {
    //Hack to get background color to adjust with theme change.
    document.body.style.backgroundColor =
      this.state.theme.palette.type == 'dark'
        ? '#303030'
        : '#FAFAFA';
    return (
      <MuiThemeProvider theme={createMuiTheme(this.state.theme)}>
        <NavigationBar
          songInfo={this.state.songInfo}
          onNavigationSelect={this.setPin}
          onPaletteTypeSelect={this.setPaletteType}
          onPaletteColorSelect={this.setPaletteColor}
        />
        <br /><br /><br /><br />
        <Pinboard
          pin={this.state.pin}
          onLibrarySelect={this.setSongInfo}
        />
      </MuiThemeProvider>
    );
  }
}

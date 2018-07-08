import React from 'react';
import ControlBar from './ControlBar';
import Pinboard from './Pinboard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

export default class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      playlist: [
        {
          artworkFileId: "5adb58305b7e950ad0c0b739",
          fileId: "5adb58265b7e950ad0c0b701",
          id: "4b1a799a-3f4d-46c5-8b80-de921fc8f301",
          name: "Fur Elise",
          trackNumber: "1",
          year: "1810"
        },
        {
          artworkFileId: "5adb58335b7e950ad0c0b74a",
          fileId: "5adb58265b7e950ad0c0b704",
          id: "3d9810cb-2330-48af-ac5b-75078b843fe8",
          name: "Moonlight Sonata",
          trackNumber: "2",
          year: "1801"
        }
      ],
      songInfo: {
        artist: {
          id: "5adb58255b7e950ad0c0b700",
          name: "Ludwig van Beethoven"
        },
        album: {
          id: "0e280c64-bb32-4d47-a8a2-80ad9aeaa408",
          name: "Greatest Hits"
        },
        song: {
          fileId: "5adb58265b7e950ad0c0b701",
          id: "4b1a799a-3f4d-46c5-8b80-de921fc8f301",
          name: "Fur Elise",
          trackNumber:  "1",
          year: "1810"
        }
      },
      pin: '',
      theme: {
        palette: {
          type: 'dark',
          primary: pink
        }
      }
    }
  }

  setPlayerData = (playlist, songInfo) => {
    this.setState({ playlist, songInfo });
  };

  setSongInfo = (songInfo) => {
    this.setState({ songInfo });
  };

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
          playlist={this.state.playlist}
          songInfo={this.state.songInfo}
          themePalette={this.state.theme.palette}
          onSongChange={this.setSongInfo}
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

import React from 'react';
import NavigationBar from './NavigationBar';
import Spotlight from './Spotlight';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

export default class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      spotlight: 'library',
      theme: {
        palette: {
          type: 'light',
          primary: pink
        }
      }
    }
  }

  setSpotlight = (spotlight) => {
    this.setState({ spotlight });
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
        : '#fafafa';
    return (
      <MuiThemeProvider theme={createMuiTheme(this.state.theme)}>
        <NavigationBar
          onNavigationSelect={this.setSpotlight}
          onPaletteTypeSelect={this.setPaletteType}
          onPaletteColorSelect={this.setPaletteColor}
        />
        <br />
        <Spotlight currentView={this.state.spotlight} />
      </MuiThemeProvider>
    );
  }
}

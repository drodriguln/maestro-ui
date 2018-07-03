import React from 'react';
import NavigationBar from './NavigationBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

export default class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      theme: createMuiTheme({
        palette: {
          primary: blueGrey
        }
      })
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={this.state.theme}>
        <NavigationBar
          onThemeColorSelect={(color) => this.setState({
            theme: createMuiTheme({
              palette: {
                primary: color
              }
            })
          })}
        />
      </MuiThemeProvider>
    );
  }
}

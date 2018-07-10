import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ResponsiveDrawer from '../../components/Drawer/ResponsiveDrawer';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#80e27e',
      main: '#4caf50',
      dark: '#087f23',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#e0e0e0',
      dark: '#aeaeae',
      contrastText: '#000',
    },
  },
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveDrawer />
      </MuiThemeProvider>
    );
  }
}

export default App;


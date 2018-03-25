import * as React from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';

import CssBaseline from 'material-ui/CssBaseline';

import rootReducer from './root.reducer';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6f60',
      main: '#e53935',
      dark: '#ab000d',
      contrastText: '#000',
    }
  }
});

const store = createStore(rootReducer);

function withRoot<P>(Component: React.ComponentType) {
  return function (props: P) {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </Provider>
    );
  };
}

export default withRoot;

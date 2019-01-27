import * as React from 'react';

import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, AnyAction } from 'redux';
import thunk from 'redux-thunk';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import rootReducer, { AppState } from '../state/root.reducer';

import onStart from './onStart';

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
  },
  typography: {
    useNextVariants: true,
  }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore<AppState, AnyAction, {}, {}>(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

onStart(store);

if (module.hot) {
  module.hot.accept('../state/root.reducer', () => {
    store.replaceReducer(require('../state/root.reducer'));
  });
}

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

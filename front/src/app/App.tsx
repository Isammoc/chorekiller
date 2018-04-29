import * as React from 'react';

import { connect } from 'react-redux';

import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui';

import Footer from './views/Footer';
import Ribbon from './views/Ribbon';
import Welcome from './views/Welcome';

import withRoot from './utils/withRoot';
import Dashboard from './views/Dashboard';
import MyAppBar from './views/MyAppBar';
import LoginDialog from './views/LoginDialog';

import { AppState }  from './state/root.reducer';

const styles: StyleRulesCallback = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 10,
  }
});

interface AppProps {
  connected: boolean;
}

const App: React.SFC<AppProps & WithStyles> = ({ connected, classes }) => (
  <div className={classes.root}>
    <Ribbon />
    <LoginDialog />
    <MyAppBar />
    {connected
      && <Dashboard />
      || <Welcome />
    }
    <Footer />
  </div>
);

const StyledApp = withStyles(styles)<AppProps>(App);

const ConnectedApp = connect((state: AppState) => ({
  connected: state.currentUser.current !== null,
}))<AppProps>(StyledApp);

export default withRoot(ConnectedApp);

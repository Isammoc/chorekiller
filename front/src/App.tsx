import * as React from 'react';

import { connect } from 'react-redux';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Footer from './components/Footer';
import Ribbon from './components/Ribbon';
import withRoot from './utils/withRoot';

import Welcome from './components/Welcome';

import Dashboard from './components/Dashboard';
import MyAppBar from './components/MyAppBar';
import LoginDialog from './components/LoginDialog';

import { AppState }  from './state/root.reducer';
import { createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: theme.spacing.unit * 10,
  }
});

interface AppProps {
  connected: boolean;
}

const App: React.SFC<AppProps & WithStyles<typeof styles>> = ({ connected, classes }) => (
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

const StyledApp = withStyles(styles)(App);

const ConnectedApp = connect((state: AppState) => ({
  connected: state.currentUser.current !== null,
}))(StyledApp);

export default withRoot(ConnectedApp);

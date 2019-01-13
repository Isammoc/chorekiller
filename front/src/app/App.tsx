import * as React from 'react';

import { connect } from 'react-redux';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import Footer from './views/Footer';
import Ribbon from './views/Ribbon';
import withRoot from './utils/withRoot';

import Welcome from './views/Welcome';

import Dashboard from './views/Dashboard';
import MyAppBar from './views/MyAppBar';
import LoginDialog from './views/LoginDialog';

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

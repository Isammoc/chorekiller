import * as React from 'react';

import { connect } from 'react-redux';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import withRoot from './utils/withRoot';

import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import LoginDialog from './components/LoginDialog';
import MyAppBar from './components/MyAppBar';
import Ribbon from './components/Ribbon';
import Welcome from './components/Welcome';

import { AppState }  from './state/root.reducer';

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

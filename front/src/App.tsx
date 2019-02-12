import * as React from 'react';

import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import withRoot from './utils/withRoot';

import Footer from './components/Footer';
import LoginDialog from './components/LoginDialog';
import MyAppBar from './components/MyAppBar';
import Ribbon from './components/Ribbon';

import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';

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
      && <Switch>
          <Route exact={true} path="/" component={Dashboard} />
          <Route exact={true} path="/profile/:id" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      || <Switch>
          <Route exact={true} path="/" component={Welcome} />
          <Route component={NotFound} />
        </Switch>
    }
    <Footer />
  </div>
);

const StyledApp = withStyles(styles)(App);

const ConnectedApp = connect((state: CKState) => ({
  connected: state.currentUser.current !== null,
}))(StyledApp);

export default withRoot(ConnectedApp);

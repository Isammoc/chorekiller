import * as React from 'react';

import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui';

import Footer from './views/Footer';
import Ribbon from './views/Ribbon';
import Welcome from './views/Welcome';

import withRoot from './utils/withRoot';
import MyAppBar from './views/MyAppBar';
import LoginDialog from './views/LoginDialog';

const styles: StyleRulesCallback = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 10,
  }
});

const App: React.SFC<{} & WithStyles> = ({ classes }) => (
  <div className={classes.root}>
    <Ribbon />
    <LoginDialog />
    <MyAppBar />
    <Welcome />
    <Footer />
  </div>
);

const StyledApp = withStyles(styles)<{}>(App);

export default withRoot(StyledApp);

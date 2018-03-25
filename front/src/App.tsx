import * as React from 'react';

import ActionAccountCircle from 'material-ui-icons/AccountCircle';

import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Footer from './Footer';
import Ribbon from './Ribbon';
import Welcome from './Welcome';

import withRoot from './withRoot';

const appBarStyles = {
  flex: {
    flex: 1,
  },
};

const MyAppBar = withStyles(appBarStyles)<{}>(({ classes }: WithStyles<'flex'>) => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        Chorekiller
      </Typography>
      <Button color="inherit"><ActionAccountCircle />&nbsp;Se connecter</Button>
    </Toolbar>
  </AppBar>)
);

const styles: StyleRulesCallback = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 10,
  }
});

const App: React.SFC<{} & WithStyles> = ({ classes }) => (
  <div className={classes.root}>
    <Ribbon />
    <MyAppBar />
    <Welcome />
    <Footer />
  </div>
);

const StyledApp = withStyles(styles)<{}>(App);

export default withRoot(StyledApp);

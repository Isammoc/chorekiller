import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import ActionAccountCircle from 'material-ui-icons/AccountCircle';

import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Footer from './views/Footer';
import Ribbon from './views/Ribbon';
import Welcome from './views/Welcome';

import withRoot from './utils/withRoot';
import { AppState } from './state/root.reducer';
import { closeModal, openModal } from './state/login.duck';

const appBarStyles = {
  flex: {
    flex: 1,
  },
};

interface MyAppBarProps {
  onConnect: () => void;
}

const MyAppBar = connect(
  (state: AppState) => ({}),
  (dispatch: Dispatch<AppState>) => ({
    onConnect: () => { dispatch(openModal()); },
  }),
)(withStyles(appBarStyles)<MyAppBarProps>(({ classes, onConnect }) => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        Chorekiller
      </Typography>
      <Button color="inherit" onClick={onConnect}><ActionAccountCircle />&nbsp;Se connecter</Button>
    </Toolbar>
  </AppBar>)
));

const styles: StyleRulesCallback = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 10,
  }
});

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog: React.SFC<LoginDialogProps> = ({open, onClose}) => (
  <Dialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>Se connecter</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus={true}
        margin="dense"
        label="Identifiant"
        fullWidth={true}
      />
      <TextField
        margin="dense"
        label="Mot de passe"
        type="password"
        fullWidth={true}
      />
    </DialogContent>
    <DialogActions >
      <Button onClick={onClose}>Annuler</Button>
      <Button variant="raised" color="primary">Se connecter</Button>
    </DialogActions>
  </Dialog>
);

const CLoginDialog = connect(
  (state: AppState) => ({
    open: state.currentUser.status === 'pending',
  }),
  (dispatch: Dispatch<AppState>) => {
  return {
    onClose: () => {
      dispatch(closeModal());
    },
  };
})(LoginDialog);

const App: React.SFC<{} & WithStyles> = ({ classes }) => (
  <div className={classes.root}>
    <Ribbon />
    <CLoginDialog />
    <MyAppBar />
    <Welcome />
    <Footer />
  </div>
);

const StyledApp = withStyles(styles)<{}>(App);

export default withRoot(StyledApp);

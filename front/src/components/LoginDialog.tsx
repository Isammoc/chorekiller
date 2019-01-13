import * as React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from '../state/root.reducer';
import { closeModal, login } from '../state/login/action';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';

interface LoginDialogProps {
  open: boolean;
  submittable: boolean;
  error: boolean;
  onClose: () => void;
  onConnect: (login: string, password: string) => void;
}

interface LoginDialogState {
  login: string;
  password: string;
}

class LoginDialog extends React.Component<LoginDialogProps, LoginDialogState> {
  constructor(props: LoginDialogProps) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  changeLogin(newLogin: string) {
    this.setState({
      ...this.state,
      login: newLogin,
    });
  }

  changePassword(newPassword: string) {
    this.setState({
      ...this.state,
      password: newPassword,
    });
  }

  handleSubmit() {
    this.props.onConnect(this.state.login, this.state.password);
  }

  render() {
    const { open, onClose, submittable, error } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <DialogTitle>
            Se connecter
            {!submittable &&
              <CircularProgress size="1em" />}
          </DialogTitle>
          <DialogContent>
            {error &&
              <FormHelperText error={true}>
                Identification échouée. Veuillez réessayer.
              </FormHelperText>
            }
            <TextField
              disabled={!submittable}
              autoFocus={true}
              margin="dense"
              label="Identifiant"
              fullWidth={true}
              value={this.state.login}
              onChange={change => this.changeLogin(change.currentTarget.value)}
            />
            <TextField
              disabled={!submittable}
              margin="dense"
              label="Mot de passe"
              type="password"
              fullWidth={true}
              value={this.state.password}
              onChange={change => this.changePassword(change.currentTarget.value)}
            />
          </DialogContent>
          <DialogActions >
            <Button onClick={onClose}>Annuler</Button>
            <Button
              type="submit"
              disabled={!submittable}
              variant="raised"
              color="primary"
            >
              Se connecter
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default connect(
  (state: AppState) => ({
    open: state.currentUser.form !== 'none',
    submittable: state.currentUser.form !== 'none' && state.currentUser.status !== 'pending',
    error: state.currentUser.form === 'error',
  }),
  (dispatch: ThunkDispatch<AppState, {}, AnyAction>) => ({
    onClose: () => {
      dispatch(closeModal());
    },
    onConnect: (name: string, password: string) => {
      dispatch(login(name, password));
    },
  }))(LoginDialog);

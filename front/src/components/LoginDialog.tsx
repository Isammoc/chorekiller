import * as React from 'react';

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';

import TextField from './utils/TextField';

import { closeModal, login } from '../state/login/action';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onConnect: (values: Login) => void;
}

interface Login {
  login: string;
  password: string;
}

const LoginForm =
  ({ handleSubmit, open, onClose, onConnect, submitting, error }: InjectedFormProps<Login> & LoginDialogProps) => (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onConnect)}>
        <DialogTitle>
          Se connecter
          {submitting &&
            <CircularProgress size="1em" />}
        </DialogTitle>
        <DialogContent>
          {error &&
            <FormHelperText error={true}>
              Identification échouée. Veuillez réessayer.
            {error}
            </FormHelperText>
          }
          <Field name="login" component={TextField} label="Identifiant" margin="dense" autoFocus={true} />
          <Field name="password" component={TextField} label="Mot de passe" margin="dense" type="password" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button
            type="submit"
            disabled={submitting}
            variant="contained"
            color="primary"
          >
            Se connecter
          </Button>
        </DialogActions>
      </form>
    </Dialog>);

export default connect(
  (state: CKState) => ({
    open: state.currentUser.form !== 'none',
    submittable: state.currentUser.form !== 'none' && state.currentUser.status !== 'pending',
    error: state.currentUser.form === 'error',
  }),
  (dispatch: CKDispatch) => ({
    onClose: () => {
      dispatch(closeModal());
    },
    onConnect: (values: Login) => {
      dispatch(login(values.login, values.password));
    },
  }))(
    reduxForm<Login, LoginDialogProps>({
      form: 'login',
    })(LoginForm));

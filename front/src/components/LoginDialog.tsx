import * as React from 'react';

import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps, Field, SubmissionError } from 'redux-form';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';

import { closeModal, login } from '../state/login/action';
import { User } from '../model';

import TextField from './utils/TextField';
import PasswordField from './utils/PasswordField';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onConnect: (values: Login) => Promise<User>;
}

interface Login {
  login: string;
  password: string;
}

const mySubmit =
  (real: (values: Login) => Promise<User>) =>
    (values: Login) => new Promise<void>((resolve, reject) => {
      real(values).then(() => resolve()).catch(() => {
        reject(new SubmissionError<Login>({ _error: 'Couple login/mot de passe erronné.' }));
      });
    });

const LoginForm =
  ({
    handleSubmit,
    open,
    onClose,
    onConnect,
    submitting,
    submitFailed,
    error
  }: InjectedFormProps<Login> & LoginDialogProps) => (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit(mySubmit(onConnect))}>
          <DialogTitle>
            Se connecter
          {submitting &&
              <CircularProgress size="1em" />}
          </DialogTitle>
          <DialogContent>
            {submitFailed && Boolean(error) &&
              <FormHelperText error={true}>
                {error}
              </FormHelperText>
            }
            <Field name="login" component={TextField} label="Identifiant" margin="dense" autoFocus={true} />
            <Field name="password" component={PasswordField} label="Mot de passe" margin="dense" type="password" />
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
  {
    onClose: closeModal,
    onConnect: (values: Login) => login(values.login, values.password),
  }
)(
  reduxForm<Login, LoginDialogProps>({
    form: 'login',
  })(LoginForm)
);

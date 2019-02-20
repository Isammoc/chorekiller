import * as React from 'react';

import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps, Field, FormErrors, SubmissionError } from 'redux-form';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { changePassword } from '../state/login/action';

import PasswordField from './utils/PasswordField';

interface Props {
  onSubmit: (values: PasswordChange) => Promise<void>;
}

interface PasswordChange {
  oldPassword: string;
  newPassword: string;
  verifyPassword: string;
}

const validate = (values: PasswordChange) => {
  const errors: FormErrors<PasswordChange> = {};
  if (!values.oldPassword) {
    errors.oldPassword = 'Requis';
  }
  if (!values.newPassword) {
    errors.newPassword = 'Requis';
  }
  if (!values.verifyPassword) {
    errors.verifyPassword = 'Requis';
  } else if (values.verifyPassword !== values.newPassword) {
    errors.verifyPassword = 'Doit être identique à votre nouveau mot de passe';
  }
  return errors;
};

const mySubmit =
  (real: (values: PasswordChange) => Promise<void>) =>
    (values: PasswordChange) =>
      new Promise<void>((resolve, reject) => {
        real(values).then(() => {
          resolve();
        }).catch(() => {
          reject(new SubmissionError<PasswordChange>({
            _error: 'Impossible de modifier le mot de passe.',
          }));
        });
      });

const PasswordForm =
  ({
    error,
    handleSubmit,
    onSubmit,
    submitting,
    submitFailed,
    submitSucceeded,
  }: Props & InjectedFormProps<PasswordChange, Props>) => {
    return (
      <Card>
        <form onSubmit={handleSubmit(mySubmit(onSubmit))}>
          <CardHeader title="Modification du mot de passe" />
          <CardContent>
            {submitSucceeded &&
              <Typography gutterBottom={true}>Mot de passe modifié avec succès.</Typography>
            }
            {submitFailed && Boolean(error) &&
              <Typography color="error" gutterBottom={true}>
                {error}
              </Typography>
            }
            <Field name="oldPassword" id="old-password" label="Mot de passe actuel" component={PasswordField} />
            <Field name="newPassword" id="new-password" label="Nouveau mot de passe" component={PasswordField} />
            <Field name="verifyPassword" id="verify-password" label="Vérification" component={PasswordField} />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              disabled={submitting}
              type="submit"
            >
              Changer de mot de passe
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  };

export default connect(
  undefined,
  (dispatch: CKDispatch) => ({
    onSubmit:
      (values: PasswordChange) => dispatch(changePassword(values.oldPassword, values.newPassword)),
  }),
)(reduxForm<PasswordChange>({
  form: 'passwordChange',
  validate,
})(PasswordForm));

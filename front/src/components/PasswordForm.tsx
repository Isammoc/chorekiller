import * as React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { changePassword } from '../state/login/action';

import PasswordInput from './PasswordInput';

interface PasswordFormProps {
  success: boolean;
  error: boolean;
  onSubmit: (oldPassword: string, newPassword: string) => void;
}

const PasswordForm: React.SFC<PasswordFormProps> = ({ onSubmit, success, error }) => {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [verifyPassword, setVerifyPassword] = React.useState('');

  const errorPassword = verifyPassword !== newPassword;
  const possible = !errorPassword && newPassword.length !== 0;
  const submit = (e: React.FormEvent) => {
    if (possible) {
      onSubmit(oldPassword, newPassword);
    }
    setOldPassword('');
    setNewPassword('');
    setVerifyPassword('');
    e.preventDefault();
  };

  return (
    <Card>
      <form onSubmit={submit}>
        <CardHeader title="Modification du mot de passe" />
        <CardContent>
          {success &&
            <Typography color="textSecondary" gutterBottom={true}>Mot de passe modifié avec succès.</Typography>
          }
          {error &&
            <Typography color="error" gutterBottom={true}>Erreur lors de la modification du mot de passe.</Typography>
          }
          <PasswordInput
            label="Mot de passe actuel"
            password={oldPassword}
            setPassword={setOldPassword}
            error={false}
          />
          <PasswordInput
            label="Nouveau mot de passe"
            password={newPassword}
            setPassword={setNewPassword}
            error={false}
          />
          <PasswordInput
            label="Vérification"
            password={verifyPassword}
            setPassword={setVerifyPassword}
            error={errorPassword}
          />
        </CardContent>
        <CardActionArea>
          <Button
            variant="contained"
            color="primary"
            disabled={!possible}
            type="submit"
          >
            Changer de mot de passe
          </Button>
        </CardActionArea>
      </form>
    </Card>
  );
};

export default connect(
  (state: CKState) => ({
    success: state.currentUser.current!.passwordChanged === 'success',
    error: state.currentUser.current!.passwordChanged === 'error',
  }),
  (dispatch: CKDispatch) => ({
    onSubmit: (oldPassword: string, newPassword: string) => {
      dispatch(changePassword(oldPassword, newPassword));
    },
  }),
)(PasswordForm);

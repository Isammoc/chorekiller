import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import * as login from '../state/login/action';

interface WelcomeProps {
  onConnect: () => void;
}

const Welcome: React.SFC<WelcomeProps> = ({ onConnect }) => (
  <Paper elevation={1} style={{ margin: '1em', padding: '1em', }}>
    <h2>Bienvenue !</h2>
    <p>Chorekiller est mon petit projet pour suivre les tâches ménagères au jour le jour.</p>
    <p>Aujourd'hui, il ne contient qu'une seule liste de course.</p>
    <p>
      <Button variant="contained" color="primary" onClick={onConnect}>Connectez-vous</Button>
      &nbsp;si vous avez un compte. Sinon, créez votre propre instance.
      </p>
  </Paper>
);

export default connect(null, (dispatch: Dispatch<AnyAction>) => ({
  onConnect: () => { dispatch(login.openModal()); }
}))(Welcome);

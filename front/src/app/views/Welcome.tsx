import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import { AppState } from '../state/root.reducer';
import { openModal } from '../state/login.duck';

interface WelcomeProps {
  onConnect: () => void;
}

const Welcome: React.SFC<WelcomeProps> = ({ onConnect }) => (
  <Paper elevation={1} style={{ margin: '1em', padding: '1em', }}>
    <h2>Bienvenue !</h2>
    <p>Chorekiller est mon petit projet pour suivre les tâches ménagères au jour le jour.</p>
    <p>Aujourd'hui, il ne contient qu'une seule liste de course.</p>
    <p>
      <Button variant="raised" color="primary" onClick={onConnect}>Connectez-vous</Button>
      &nbsp;si vous avez un compte. Sinon, créez votre propre instance.
      </p>
  </Paper>
);

export default connect(null, (dispatch: Dispatch<AppState>) => ({
  onConnect: () => { dispatch(openModal()); }
}))(Welcome);

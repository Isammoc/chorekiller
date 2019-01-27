import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import * as login from '../state/login/action';

interface WelcomeProps {
  onConnect: () => void;
}

const Welcome: React.SFC<WelcomeProps> = ({ onConnect }) => (
  <Card>
    <CardHeader title="Bienvenue !" />
    <CardContent>
      <h2>Bienvenue !</h2>
      <p>Chorekiller est mon petit projet pour suivre les tâches ménagères au jour le jour.</p>
      <p>Aujourd'hui, il ne contient qu'une seule liste de course.</p>
      <p>
        <Button variant="contained" color="primary" onClick={onConnect}>Connectez-vous</Button>
        &nbsp;si vous avez un compte. Sinon, créez votre propre instance.
      </p>
    </CardContent>
  </Card>
);

export default connect(null, (dispatch: Dispatch<AnyAction>) => ({
  onConnect: () => { dispatch(login.openModal()); }
}))(Welcome);

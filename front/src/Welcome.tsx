import * as React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const Welcome: React.SFC<{}> = () => (
  <Paper zDepth={1} style={{ margin: '1em', padding: '1em', }}>
    <h2>Bienvenue !</h2>
    <p>Chorekiller est mon petit projet pour suivre les tâches ménagères au jour le jour.</p>
    <p>Aujourd'hui, il ne contient qu'une seule liste de course.</p>
    <p>
      <RaisedButton primary={true} label="Connectez-vous" />
      &nbsp;si vous avez un compte. Sinon, créer votre propre instance.
      </p>
  </Paper>
);

export default Welcome;

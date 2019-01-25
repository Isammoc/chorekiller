import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import LogInButton from '../components/LogInButton';

export default () => (
  <Card>
    <CardHeader title="Bienvenue !" />
    <CardContent>
      <p>Chorekiller est mon petit projet pour suivre les tâches ménagères au jour le jour.</p>
      <p>Aujourd'hui, il ne contient qu'une seule liste de course.</p>
      <p>
        <LogInButton>Connectez-vous</LogInButton>
        &nbsp;si vous avez un compte. Sinon, créez votre propre instance.
      </p>
    </CardContent>
  </Card>
);

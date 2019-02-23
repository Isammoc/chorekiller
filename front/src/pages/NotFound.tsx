import * as React from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import LogInButton from '../components/LogInButton';
import { selectors } from '../state/root.selector';

type NotFoundProps = {
  connected: boolean;
};

const NotFound: React.SFC<NotFoundProps> = ({ connected }) => (
  <Card>
    <CardHeader title="Page non trouvée !" />
    <CardContent>
      {!connected &&
        <p>
          <LogInButton>Connectez-vous</LogInButton>
          &nbsp;si vous avez un compte. Sinon, créez votre propre instance.
        </p>
      }
    </CardContent>
  </Card>
);

export default connect(
  (state: CKState) => ({
    connected: selectors(state).isConnected,
  })
)(NotFound);

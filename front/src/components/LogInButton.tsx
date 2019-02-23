import * as React from 'react';

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import * as login from '../state/login/action';

type Props = {
  onConnect: () => void;
};

const LogInButton = ({ onConnect }: Props) => (
  <Button variant="contained" color="primary" onClick={onConnect}>Connectez-vous</Button>
);

export default connect(
  null,
  {
    onConnect: () => login.openModal(),
  }
)(LogInButton);

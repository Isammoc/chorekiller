import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Button from '@material-ui/core/Button';

import * as login from '../state/login/action';

interface LogInButtonProps {
  onConnect: () => void;
}

const LogInButton: React.SFC<LogInButtonProps> = ({ onConnect }) => (
  <Button variant="contained" color="primary" onClick={onConnect}>Connectez-vous</Button>
);

export default connect(null, (dispatch: Dispatch<AnyAction>) => ({
  onConnect: () => { dispatch(login.openModal()); }
}))(LogInButton);

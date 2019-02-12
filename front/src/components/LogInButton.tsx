import * as React from 'react';

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import * as login from '../state/login/action';

interface LogInButtonProps {
  onConnect: () => void;
}

const LogInButton: React.SFC<LogInButtonProps> = ({ onConnect }) => (
  <Button variant="contained" color="primary" onClick={onConnect}>Connectez-vous</Button>
);

export default connect(null, (dispatch: CKDispatch) => ({
  onConnect: () => { dispatch(login.openModal()); }
}))(LogInButton);

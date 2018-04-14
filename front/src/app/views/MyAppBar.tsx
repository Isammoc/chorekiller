import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import ActionAccountCircle from 'material-ui-icons/AccountCircle';

import { withStyles, Avatar, IconButton } from 'material-ui';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { openModal, User } from '../state/login.duck';

import { AppState } from '../state/root.reducer';

interface MyAppBarProps {
  currentUser: null | User;
  onConnect: () => void;
}

export default connect(
  (state: AppState) => ({
    currentUser: state.currentUser.current,
  }),
  (dispatch: Dispatch<AppState>) => ({
    onConnect: () => { dispatch(openModal()); },
  }),
)(withStyles({
  flex: {
    flex: 1,
  },
  icon: {
    position: 'relative',
    fontSize: '1.2em',
    display: 'inline-flex',
  }
})<MyAppBarProps>(({ classes, onConnect, currentUser }) => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        Chorekiller
      </Typography>
      {!currentUser &&
        <Button color="inherit" onClick={onConnect}>
          <ActionAccountCircle />&nbsp;Se connecter
        </Button>
      }
      {currentUser &&
        <div>
          <IconButton>
            <Avatar>{currentUser.name.toUpperCase()[0]}</Avatar>
          </IconButton>
        </div>
      }
    </Toolbar>
  </AppBar>)));

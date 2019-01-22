import * as React from 'react';

import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';

import ActionAccountCircle from '@material-ui/icons/AccountCircle';

import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { openModal, logout } from '../state/login/action';

import { AppState } from '../state/root.reducer';
import { User } from '../model';

interface MyAppBarProps {
  currentUser: null | User;
  onConnect: () => void;
  onLogout: () => void;
}

interface MyAppBarState {
  anchorEl: HTMLElement | null;
}

const styles: StyleRulesCallback = theme => ({
  flex: {
    flex: 1,
  },
  icon: {
    position: 'relative',
    fontSize: '1.2em',
    display: 'inline-flex',
  }
});

class MyAppBar extends React.Component<MyAppBarProps & WithStyles, MyAppBarState> {
  constructor(props: MyAppBarProps & WithStyles) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  public handleClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  public handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  }

  public render() {
    const { classes, onConnect, currentUser, onLogout } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Chorekiller
          </Typography>
          {!currentUser &&
            <Button color="inherit" onClick={onConnect}>
              <ActionAccountCircle />&nbsp;Se connecter
            </Button>
          }
          {currentUser &&
            <div>
              <IconButton onClick={this.handleClick}>
                <Avatar>{currentUser.name.toUpperCase()[0]}</Avatar>
              </IconButton>
            </div>
          }
          <Menu
            id="coucou"
            anchorEl={this.state.anchorEl!}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={() => { this.handleClose(); onLogout(); }}>Déconnexion</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>);
  }
}

export default connect(
  (state: AppState) => ({
    currentUser: state.currentUser.current,
  }),
  (dispatch: Dispatch<AnyAction>) => ({
    onConnect: () => { dispatch(openModal()); },
    onLogout: () => { dispatch(logout()); },
  }),
)(withStyles(styles)(MyAppBar));

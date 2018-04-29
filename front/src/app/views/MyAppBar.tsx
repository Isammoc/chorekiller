import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import ActionAccountCircle from 'material-ui-icons/AccountCircle';

import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/Menu/MenuItem';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { openModal, User, logout } from '../state/login.duck';

import { AppState } from '../state/root.reducer';

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
  (dispatch: Dispatch<AppState>) => ({
    onConnect: () => { dispatch(openModal()); },
    onLogout: () => { dispatch(logout()); },
  }),
)(withStyles(styles)<MyAppBarProps>(MyAppBar));

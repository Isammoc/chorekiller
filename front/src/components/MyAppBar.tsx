import * as React from 'react';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ActionAccountCircle from '@material-ui/icons/AccountCircle';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { deepPurple } from '@material-ui/core/colors';
import withStyles, { WithStyles, StyleRulesCallback } from '@material-ui/core/styles/withStyles';

import { openModal, logout } from '../state/login/action';
import { User } from '../model';

interface MyAppBarProps {
  currentUser: null | User;
  onConnect: () => void;
  onLogout: () => void;
  onHome: () => void;
  onProfile: (login: string) => void;
}

interface MyAppBarState {
  anchorEl: HTMLElement | null;
}

const styles: StyleRulesCallback = theme => ({
  flex: {
    cursor: 'pointer',
    flex: 1,
  },
  icon: {
    display: 'inline-flex',
    fontSize: '1.2em',
    position: 'relative',
  },
  mainIcon: {
    cursor: 'pointer',
    backgroundColor: deepPurple[500],
  },
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

  public handleOnHome = (e: React.BaseSyntheticEvent) => {
    this.props.onHome();
    e.preventDefault();
  }

  public render() {
    const { classes, onConnect, currentUser, onLogout, onProfile } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <Avatar alt="Chorekiller" src="/favicon.ico" className={classes.mainIcon} onClick={this.handleOnHome} />
          <Typography variant="h6" color="inherit" className={classes.flex} onClick={this.handleOnHome}>
            Chorekiller
          </Typography>
          {currentUser &&
            <div>
              <IconButton onClick={this.handleClick}>
                <Avatar>{currentUser.name.toUpperCase()[0]}</Avatar>
              </IconButton>
            </div>
            ||
            <Button color="inherit" onClick={onConnect}>
              <ActionAccountCircle />&nbsp;Se connecter
            </Button>
          }
          <Menu
            id="coucou"
            anchorEl={this.state.anchorEl!}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={() => { this.handleClose(); onProfile( currentUser!.login ); }}>Profile</MenuItem>
            <Divider />
            <MenuItem onClick={() => { this.handleClose(); onLogout(); }}>Déconnexion</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>);
  }
}

export default connect(
  (state: CKState) => ({
    currentUser: state.currentUser.current,
  }),
  {
    onConnect: openModal,
    onLogout: logout,
    onHome: () => push('/'),
    onProfile: (login: string) => push('/profile/' + login),
  },
)(withStyles(styles)(MyAppBar));

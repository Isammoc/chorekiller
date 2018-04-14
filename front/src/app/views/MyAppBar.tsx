import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import ActionAccountCircle from 'material-ui-icons/AccountCircle';

import { withStyles } from 'material-ui';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { openModal } from '../state/login.duck';

import { AppState } from '../state/root.reducer';

const appBarStyles = {
    flex: {
        flex: 1,
    },
};

interface MyAppBarProps {
    onConnect: () => void;
}

export default connect(
    (state: AppState) => ({}),
    (dispatch: Dispatch<AppState>) => ({
        onConnect: () => { dispatch(openModal()); },
    }),
)(withStyles(appBarStyles)<MyAppBarProps>(({ classes, onConnect }) => (
    <AppBar>
        <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
                Chorekiller
        </Typography>
            <Button color="inherit" onClick={onConnect}><ActionAccountCircle />&nbsp;Se connecter</Button>
        </Toolbar>
    </AppBar>)
));

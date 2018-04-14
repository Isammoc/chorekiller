import * as React from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../state/root.reducer';
import { closeModal, login } from '../state/login.duck';

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
    onConnect: (login: string, password: string) => void;
}

interface LoginDialogState {
    login: string;
    password: string;
}

class LoginDialog extends React.Component<LoginDialogProps, LoginDialogState> {
    constructor(props: LoginDialogProps) {
        super(props);
        this.state = {
            login: 'Hello',
            password: '',
        };
    }

    changeLogin(newLogin: string) {
        this.setState({
            ...this.state,
            login: newLogin,
        });
    }

    changePassword(newPassword: string) {
        this.setState({
            ...this.state,
            password: newPassword,
        });
    }

    handleSubmit() {
        this.props.onConnect(this.state.login, this.state.password);
    }

    render() {
        const { open, onClose } = this.props;
        return (
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Se connecter</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        label="Identifiant"
                        fullWidth={true}
                        value={this.state.login}
                        onChange={change => this.changeLogin(change.currentTarget.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Mot de passe"
                        type="password"
                        fullWidth={true}
                        value={this.state.password}
                        onChange={change => this.changePassword(change.currentTarget.value)}
                    />
                </DialogContent>
                <DialogActions >
                    <Button onClick={onClose}>Annuler</Button>
                    <Button onClick={e => this.handleSubmit()} variant="raised" color="primary">Se connecter</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect(
    (state: AppState) => ({
        open: state.currentUser.status === 'pending',
    }),
    (dispatch: Dispatch<AppState>) => {
        return {
            onClose: () => {
                dispatch(closeModal());
            },
            onConnect: (name: string, password: string) => {
                dispatch(login(name, password));
            },
        };
    })(LoginDialog);

import * as React from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../state/root.reducer';
import { closeModal } from '../state/login.duck';

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

const LoginDialog: React.SFC<LoginDialogProps> = ({ open, onClose }) => (
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
            />
            <TextField
                margin="dense"
                label="Mot de passe"
                type="password"
                fullWidth={true}
            />
        </DialogContent>
        <DialogActions >
            <Button onClick={onClose}>Annuler</Button>
            <Button variant="raised" color="primary">Se connecter</Button>
        </DialogActions>
    </Dialog>
);

export default connect(
    (state: AppState) => ({
        open: state.currentUser.status === 'pending',
    }),
    (dispatch: Dispatch<AppState>) => {
        return {
            onClose: () => {
                dispatch(closeModal());
            },
        };
    })(LoginDialog);

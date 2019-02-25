import { User } from '../../model';

import actionTypes from './actionTypes';
import directClient from '../../client';

export const openModal = () => ({
  type: actionTypes.OPEN_MODAL,
});

export const closeModal = () => ({
  type: actionTypes.CLOSE_MODAL,
});

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginFailure = (error: Error) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: {
    error,
  }
});

const loginSuccess = (user: User) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const renewToken =
  (token: string) => {
    localStorage.setItem('token', token);
    return {
      type: actionTypes.TOKEN_RENEW,
      payload: token,
    };
  };

export const loadToken = (dispatch: CKDispatch, getState: () => CKState) => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(renewToken(token));
    dispatch(loginRequest());
    directClient(dispatch, getState).login.connectedUser(token)
      .then(res => {
        dispatch(loginSuccess(res));
      }).catch(err => dispatch(loginFailure(err)));
  }
};

export const login = (username: string, password: string) =>
  (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
    dispatch(loginRequest());
    const res = client(dispatch, getState).login.login(username, password);
    res.then(user => {
      dispatch(loginSuccess(user));
    }).catch(err => dispatch(loginFailure(err)));
    return res;
  };

const actionLogout = () => ({
  type: actionTypes.LOGOUT,
});

export const logout = () => (dispatch: CKDispatch) => {
  localStorage.removeItem('token');
  dispatch(actionLogout());
};

const changePasswordRequest = () => ({
  type: actionTypes.CHANGE_PASSWORD_REQUEST,
});

const changePasswordFailure = (err: Error) => ({
  type: actionTypes.CHANGE_PASSWORD_FAILURE,
  payload: err
});

const changePasswordSuccess = () => ({
  type: actionTypes.CHANGE_PASSWORD_SUCCESS,
});

export const changePassword =
  (oldPassword: string, newPassword: string) =>
    (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
      dispatch(changePasswordRequest());
      const res = client(dispatch, getState).login.changePassword(oldPassword, newPassword);
      res
        .then(() => { dispatch(changePasswordSuccess()); })
        .catch(err => { dispatch(changePasswordFailure(err)); });
      return res;
    };

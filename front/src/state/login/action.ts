import { login as clientLogin, connectedUser as clientConnected } from '../../client/login';
import { User } from '../../model';

import { fetchList } from '../groceries/action';

import actionTypes from './actionTypes';

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

const saveToken = (user: User) => {
  localStorage.setItem('token', user.authorization);
};

export const loadToken = (dispatch: CKDispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(loginRequest());
    clientConnected(token)
    .then(res => {
      dispatch(loginSuccess(res));
      dispatch(fetchList());
    }).catch(err => dispatch(loginFailure(err)));
  }
};

export const login = (username: string, password: string) =>
  (dispatch: CKDispatch) => {
    dispatch(loginRequest());
    clientLogin(username, password)
      .then(res => {
        dispatch(loginSuccess(res));
        saveToken(res);
        dispatch(fetchList());
      }).catch(err => dispatch(loginFailure(err)));
  };

const actionLogout = () => ({
  type: actionTypes.LOGOUT,
});

export const logout = () => (dispatch: CKDispatch) => {
  localStorage.removeItem('token');
  dispatch(actionLogout());
};

import actionTypes from './actionTypes';
import { login as clientLogin, connectedUser as clientConnected } from '../../client/login';
import { User } from '../../model';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../root.reducer';
import { AnyAction } from 'redux';
import { fetchList } from '../groceries/action';

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

export const loadToken = (dispatch: ThunkDispatch<AppState, {}, AnyAction>) => {
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
  (dispatch: ThunkDispatch<AppState, {}, AnyAction>) => {
    dispatch(loginRequest());
    clientLogin(username, password)
      .then(res => {
        dispatch(loginSuccess(res));
        saveToken(res);
        dispatch(fetchList());
      }).catch(err => dispatch(loginFailure(err)));
  };

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

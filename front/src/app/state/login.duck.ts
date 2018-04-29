import { AnyAction, Dispatch } from 'redux';
import { AppState } from './root.reducer';
import { User, login as clientLogin } from '../client';

export { User } from '../client';

// Actions
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const LOGOUT = 'LOGOUT';

const defaultCurrentUser: PossibleState<User> = {
  current: null,
  status: 'none',
  form: 'none',
};

// Reducer
const loginReducer = (state: PossibleState<User> = defaultCurrentUser, action: AnyAction) => {
  switch (action.type) {
    case OPEN_MODAL:
      if (state.status === 'alive') {
        return state;
      }
      return {
        ...state,
        form: 'pending',
      };
    case CLOSE_MODAL:
      return {
        ...state,
        form: 'none',
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        status: 'pending',
        form: 'pending',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: 'alive',
        form: 'none',
        current: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        status: 'none',
        form: 'error',
      };
    case LOGOUT:
      return {
        ...state,
        status: 'none',
        form: 'none',
        current: null,
      };
    default:
      return state;
  }
};

export default loginReducer;

// Action Creators
export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginFailure = (error: Error) => ({
  type: LOGIN_FAILURE,
  payload: {
    error,
  }
});

const loginSuccess = (user: User) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const login = (username: string, password: string) =>
  (dispatch: Dispatch<AppState>) => {
    dispatch(loginRequest());
    clientLogin(username, password)
      .then(res => dispatch(loginSuccess(res)))
      .catch(err => dispatch(loginFailure(err)));
  };

export const logout = () => ({
  type: LOGOUT,
});

export interface PossibleState<P> {
  current: P | null;
  status: 'none' | 'pending' | 'alive';
  form: 'none' | 'pending' | 'error';
}

export type UserState = PossibleState<User>;

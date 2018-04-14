import { AnyAction, Dispatch } from 'redux';
import { AppState } from './root.reducer';

// Actions
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const defaultCurrentUser: PossibleState<User> = {
  current: null,
  status: 'none',
  form: 'none',
};

// Reducer
const loginReducer = (state: PossibleState<User> = defaultCurrentUser, action: AnyAction) => {
  switch (action.type) {
    case OPEN_MODAL:
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

export function login(username: string, password: string) {
  return (dispatch: Dispatch<AppState>) => {
    dispatch(loginRequest());
    fetch('/api/users/me', {
      method: 'post',
      body: JSON.stringify({ login: username, password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          res.json().then(json =>
            dispatch(loginSuccess({
              login: json.login,
              name: json.displayName,
            }))
          ).catch(err => dispatch(loginFailure(err)));
        } else {
          dispatch(loginFailure({ name: res.statusText, message: '' + res.status }));
        }
      })
      .catch(err => dispatch(loginFailure(err)));
  };
}

export interface PossibleState<P> {
  current: P | null;
  status: 'none' | 'pending' | 'alive';
  form: 'none' | 'pending' | 'error';
}

export interface User {
  login: string;
  name: string;
}

export type UserState = PossibleState<User>;

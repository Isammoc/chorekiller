import { selectors } from '../state/root.selector';
import profile from './profile';
import groceries from './groceries';
import * as login from './login';
import { renewToken } from '../state/login/action';

const withRenewToken =
  (dispatch: CKDispatch, getState: () => CKState) =>
    (input: RequestInfo, init?: RequestInit) => {
      const realInit = {
        ...init,
        headers: {
          ...(init ? init.headers : {}),
          'Authorization': selectors(getState()).token,
        }
      };
      return fetch(input, realInit).then(res => {
        const newToken = res.headers.get('Set-Authorization');
        if (newToken) {
          dispatch(renewToken(newToken));
        }
        return res;
      });
    };

const client = (dispatch: CKDispatch, getState: () => CKState) => {
  const api = withRenewToken(dispatch, getState);
  return {
    profile: profile(api),
    groceries: groceries(api),
    login: {
      login: login.login,
      changePassword:
        (oldPassword: string, newPassword: string) => login.changePassword(api, oldPassword, newPassword),
      connectedUser: (possibleToken: string) => login.connectedUser(api),
    }
  };
};

export default client;

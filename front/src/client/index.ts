import { selectors } from '../state/root.selector';
import profile from './profile';
import groceries from './groceries';
import * as login from './login';

const client = (getState: () => CKState) => {
  const token = () => selectors(getState()).token;
  return {
    profile: profile(token),
    groceries: groceries(token),
    login: {
      login: login.login,
      changePassword:
        (oldPassword: string, newPassword: string) => login.changePassword(token(), oldPassword, newPassword),
      connectedUser: (possibleToken: string) => login.connectedUser(possibleToken),
    }
  };
};

export default client;

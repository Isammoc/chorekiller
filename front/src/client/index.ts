import { selectors } from '../state/root.selector';
import { getProfile } from './profile';
import groceries from './groceries';
import * as login from './login';

const client = (getState: () => CKState) => {
  const token = () => selectors(getState()).token;
  return {
    getProfile: (id: string) => getProfile(token(), id),
    groceries: {
      addItem: (item: string) => groceries.addItem(token(), item),
      completeItem: (id: number) => groceries.completeItem(token(), id),
      deleteItem: (id: number) => groceries.deleteItem(token(), id),
      fetchItems: () => groceries.fetchItems(token()),
      uncompleteItem: (id: number) => groceries.uncompleteItem(token(), id),
    },
    login: {
      login: login.login,
      changePassword:
        (oldPassword: string, newPassword: string) => login.changePassword(token(), oldPassword, newPassword),
      connectedUser: (possibleToken: string) => login.connectedUser(possibleToken),
    }
  };
};

export default client;

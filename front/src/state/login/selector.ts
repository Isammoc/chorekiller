import { UserState } from '../../model';

export const userSelectors = (userState: UserState) => ({
  authentication: () => {
    if (userState.current) {
      return userState.current.authorization;
    } else {
      return '';
    }
  },
  isConnected: () => {
    return Boolean(userState.current);
  }
});

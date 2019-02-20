import { UserState } from '../../model';

export const userSelectors = (userState: UserState) => ({
  authentication: () => userState.token,
  isConnected: () => Boolean(userState.current),
});

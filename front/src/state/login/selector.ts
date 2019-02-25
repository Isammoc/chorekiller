import { UserState } from '../../model';

export const userSelectors = (userState: UserState) => ({
  authentication: () => userState.token,
  isConnected: () => Boolean(userState.current),
  isModalOpen: () => userState.form !== 'none',
  getCurrent: () => userState.current,
  isCurrentLogin: (login: string) => userState.current && userState.current.login === login,
});

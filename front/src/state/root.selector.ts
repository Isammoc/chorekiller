import { userSelectors } from './login/selector';

export const selectors = (state: CKState) => {
  const userSelect = userSelectors(state.currentUser);
  return {
    user: userSelect,
    token: userSelect.authentication(),
    isConnected: userSelect.isConnected(),
  };
};

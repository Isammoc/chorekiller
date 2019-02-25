import { userSelectors } from './login/selector';
import groceries from './groceries/selector';
import profiles from './profile/selector';

export const selectors = (state: CKState) => {
  const userSelect = userSelectors(state.currentUser);
  return {
    user: userSelect,
    token: userSelect.authentication(),
    isConnected: userSelect.isConnected(),
    groceries: groceries(state.groceries),
    profiles: profiles(state.profiles),
  };
};

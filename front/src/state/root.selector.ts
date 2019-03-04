import { userSelectors } from './login/selector';
import projects from './projects/selector';
import profiles from './profile/selector';

export const selectors = (state: CKState) => {
  const userSelect = userSelectors(state.currentUser);
  return {
    user: userSelect,
    token: userSelect.authentication(),
    isConnected: userSelect.isConnected(),
    projects: projects(state.projects),
    profiles: profiles(state.profiles),
  };
};

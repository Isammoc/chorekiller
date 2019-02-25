import { ProfileState } from './reducer';

const getProfile =
  (state: ProfileState) =>
    (login: string) =>
      state[login];

export default (state: ProfileState) => ({
  getProfile: getProfile(state),
});

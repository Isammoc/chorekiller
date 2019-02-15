import actionTypes from './actionTypes';
import { Profile } from './reducer';

const profileFailure = (name: string, err: Error) => ({
  type: actionTypes.PROFILE_FAILURE,
  payload: err,
});

const profileRequest = (name: string) => ({
  type: actionTypes.PROFILE_REQUEST,
  payload: name,
});

const profileSuccess = (name: string, profile: Profile) => ({
  type: actionTypes.PROFILE_SUCCESS,
  payload: {
    name,
    profile,
  },
});

export const loadProfile =
  (name: string) =>
    (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
      dispatch(profileRequest(name));
      client.getProfile(name)
        .then(
          profile => { dispatch(profileSuccess(name, profile)); }
        ).catch(
          err => dispatch(profileFailure(name, err)));
    };

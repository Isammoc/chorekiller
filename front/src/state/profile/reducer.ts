import { Reducer, AnyAction } from 'redux';
import actionTypes from './actionTypes';

export interface Profile {
  login: string;
  displayName: string;
  isAdmin: boolean;
}

export type ProfileState = { [name: string]: Profile };

const reducer: Reducer<ProfileState, AnyAction> =
  (state: ProfileState = {}, action: AnyAction) => {
    switch (action.type) {
      case actionTypes.PROFILE_SUCCESS:
        return {
          ...state,
          [action.payload.name]: (action.payload.profile),
        };
      default:
        return state;
    }
  };

export default reducer;

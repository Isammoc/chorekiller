import { AnyAction } from 'redux';

import { UserState } from '../../model';

import actionTypes from './actionTypes';

const defaultCurrentUser: UserState = {
  current: null,
  status: 'none',
  form: 'none',
};

// Reducer
export default (state: UserState = defaultCurrentUser, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      if (state.status === 'alive') {
        return state;
      }
      return {
        ...state,
        form: 'pending',
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        form: 'none',
      };
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        status: 'pending',
        form: 'pending',
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        status: 'alive',
        form: 'none',
        current: action.payload,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        status: 'none',
        form: 'error',
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        status: 'none',
        form: 'none',
        current: null,
      };
    default:
      return state;
  }
};
import { Reducer } from 'redux';

import { UserState } from '../../model';

import actionTypes from './actionTypes';

const defaultCurrentUser: UserState = {
  current: null,
  status: 'none',
  form: 'none',
};

const changeIfOpen = (state: UserState, newForm: 'none' | 'pending' | 'error') =>
  state.form === 'none' ? state.form : newForm
  ;

const reducer: Reducer<UserState, CKAction> =
  (state: UserState = defaultCurrentUser, action: CKAction) => {
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
          form: changeIfOpen(state, 'pending'),
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
          form: changeIfOpen(state, 'error'),
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

export default reducer;

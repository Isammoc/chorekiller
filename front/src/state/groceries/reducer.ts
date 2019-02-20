import { Reducer } from 'redux';

import { GroceryState } from '../../model';

import ActionTypes from './actionTypes';

const defaultState: GroceryState = {
  current: null,
  status: 'none',
};

const reducer: Reducer<GroceryState, CKAction> =
  (state: GroceryState = defaultState, action: CKAction) => {
    switch (action.type) {
      case ActionTypes.LIST_REQUEST:
        return {
          ...state,
          status: 'pending',
        };
      case ActionTypes.LIST_FAILURE:
        return {
          ...state,
          status: 'none'
        };
      case ActionTypes.LIST_SUCCESS:
        return {
          ...state,
          status: 'alive',
          current: action.payload,
        };
      default:
        return state;
    }
  };

export default reducer;

import { AnyAction } from 'redux';

import { GroceryState } from '../../model';

import ActionTypes from './actionTypes';

const defaultState: GroceryState = {
  current: null,
  status: 'none',
  form: 'none',
  itemToAdd: '',
};

// Reducer
export default (state: GroceryState = defaultState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.CHANGE_ITEM_TO_ADD:
      return {
        ...state,
        itemToAdd: action.payload,
      };
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

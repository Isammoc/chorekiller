import { Reducer } from 'redux';

import { GroceryState, Item } from '../../model';

import ActionTypes from './actionTypes';
import { arrayToObject } from '../utils';

const defaultState: GroceryState = {
  lists: {},
  items: {},
};

const reducer: Reducer<GroceryState, CKAction> =
  (state: GroceryState = defaultState, action: CKAction) => {
    switch (action.type) {
      case ActionTypes.LIST_REQUEST:
        return {
          ...state,
          lists: {
            ...state.lists,
            [action.payload]: {
              ...state.lists[action.payload],
              loading: true,
              error: undefined,
            },
          },
        };
      case ActionTypes.LIST_FAILURE:
        return {
          ...state,
          lists: {
            ...state.lists,
            [action.payload.listId]: {
              loading: false,
              error: action.payload.error,
            },
          },
        };
      case ActionTypes.LIST_SUCCESS:
        return {
          ...state,
          lists: {
            ...state.lists,
            [action.payload.listId]: {
              loading: false,
              error: undefined,
              current: {
                title: 'Liste de courses',
                items: action.payload.items.map((item: Item) => item.id),
              },
            },
          },
          items: {
            ...state.items,
            ...arrayToObject(action.payload.items, 'id'),
          }
        };
      default:
        return state;
    }
  };

export default reducer;

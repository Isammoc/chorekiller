import { AnyAction } from 'redux';
import { Dispatch } from 'react-redux';
import { AppState } from './root.reducer';

// Actions
const LIST_REQUEST = 'LIST_REQUEST';
const LIST_FAILURE = 'LIST_FAILURE';
const LIST_SUCCESS = 'LIST_SUCCESS';

const defaultState: GroceryState = {
  current: null,
  status: 'none',
  form: 'none',
};

// Reducer
export default (state: GroceryState = defaultState, action: AnyAction) => {
  switch (action.type) {
    case LIST_REQUEST:
      return {
        ...state,
        status: 'pending',
      };
    case LIST_FAILURE:
      return {
        ...state,
        status: 'none'
      };
    case LIST_SUCCESS:
      return {
        ...state,
        status: 'alive',
        current: action.payload,
      };
    default:
      return state;
  }
};

// Action creators

const listRequest = () => ({
  type: LIST_REQUEST,
});

const listFailure = (err: Error) => ({
  type: LIST_FAILURE,
  payload: err,
});

const listSuccess = (items: Item[]) => ({
  type: LIST_SUCCESS,
  payload: items,
});

export const fetchList = () => (dispatch: Dispatch<AppState>, getState: () => AppState) => {
  dispatch(listRequest());
  fetch('/api/lists/1/items', {
    headers: {
      'Authorization': getState().currentUser.current!.authorization
    },
  }).then(res => {
    res.json().then(json => {
      dispatch(listSuccess(json.groceries));
    }).catch(err => dispatch(listFailure(err)));
  }).catch(err => dispatch(listFailure(err)));
};

// types
export interface Item {
  id: number;
  name: string;
  completed: boolean;
}

export interface PossibleState<P> {
  current: P | null;
  status: 'none' | 'pending' | 'alive';
  form: 'none' | 'pending' | 'error';
}

export type GroceryState = PossibleState<Item[]>;
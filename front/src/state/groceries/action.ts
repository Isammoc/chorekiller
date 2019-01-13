import ActionTypes from './actionTypes';

import { Item } from '../../model';
import { Dispatch, AnyAction } from 'redux';
import { AppState } from '../root.reducer';

const listRequest = () => ({
  type: ActionTypes.LIST_REQUEST,
});

const listFailure = (err: Error) => ({
  type: ActionTypes.LIST_FAILURE,
  payload: err,
});

const listSuccess = (items: Item[]) => ({
  type: ActionTypes.LIST_SUCCESS,
  payload: items,
});

export const fetchList = () => (dispatch: Dispatch<AnyAction>, getState: () => AppState) => {
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

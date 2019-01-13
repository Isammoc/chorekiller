import ActionTypes from './actionTypes';

import { Item } from '../../model';
import { Dispatch, AnyAction } from 'redux';
import { AppState } from '../root.reducer';
import { ThunkDispatch } from 'redux-thunk';

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

export const deleteItem = (id: number) =>
  (dispatch: ThunkDispatch<AppState, {}, AnyAction>, getState: () => AppState) => {
    fetch('/api/lists/1/items/' + id, {
      headers: {
        'Authorization': getState().currentUser.current!.authorization
      },
      method: 'delete'
    }).then(res => {
      dispatch(fetchList());
    });
  };

export const toggle = (id: number) => (dispatch: ThunkDispatch<AppState, {}, AnyAction>, getState: () => AppState) => {
  const completed = getState().groceries.current!.find(e => e.id === id)!.completed;

  fetch('/api/lists/1/items/' + id + '/completion', {
    headers: {
      'Authorization': getState().currentUser.current!.authorization
    },
    method: completed ? 'delete' : 'post'
  }).then(res => {
    dispatch(fetchList());
  });
};

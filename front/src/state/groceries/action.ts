import ActionTypes from './actionTypes';

import { Item } from '../../model';
import { Dispatch, AnyAction } from 'redux';
import { AppState } from '../root.reducer';
import { ThunkDispatch } from 'redux-thunk';
import client from '../../client/groceries';

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

export const changeItemToAdd = (item: string) => ({
  type: ActionTypes.CHANGE_ITEM_TO_ADD,
  payload: item,
});

export const fetchList = () => (dispatch: Dispatch<AnyAction>, getState: () => AppState) => {
  dispatch(listRequest());
  client.fetchItems(getState().currentUser.current!.authorization)
  .then(items => dispatch(listSuccess(items)))
  .catch(err => dispatch(listFailure(err)));
};

export const addItem = () => (dispatch: ThunkDispatch<AppState, {}, AnyAction>, getState: () => AppState) => {
  client.addItem(
      getState().currentUser.current!.authorization,
      getState().groceries.itemToAdd
  ).then(res => {
    dispatch(changeItemToAdd(''));
    dispatch(fetchList());
  });
};

export const deleteItem = (id: number) =>
  (dispatch: ThunkDispatch<AppState, {}, AnyAction>, getState: () => AppState) => {
    client.deleteItem(getState().currentUser.current!.authorization, id).then(res => {
      dispatch(fetchList());
    });
  };

export const toggle = (id: number) => (dispatch: ThunkDispatch<AppState, {}, AnyAction>, getState: () => AppState) => {
  const completed = getState().groceries.current!.find(e => e.id === id)!.completed;

  const clientMethod = completed ? client.uncompleteItem : client.completeItem;

  clientMethod(getState().currentUser.current!.authorization, id).then(res => {
    dispatch(fetchList());
  });
};

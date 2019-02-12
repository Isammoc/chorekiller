import { Item } from '../../model';
import client from '../../client/groceries';
import { selectors } from '../root.selector';

import ActionTypes from './actionTypes';

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

export const fetchList = () => (dispatch: CKDispatch, getState: () => CKState) => {
  dispatch(listRequest());
  client.fetchItems(selectors(getState()).token)
  .then(items => dispatch(listSuccess(items)))
  .catch(err => dispatch(listFailure(err)));
};

export const addItem = () => (dispatch: CKDispatch, getState: () => CKState) => {
  client.addItem(
      selectors(getState()).token,
      getState().groceries.itemToAdd
  ).then(res => {
    dispatch(changeItemToAdd(''));
    dispatch(fetchList());
  });
};

export const deleteItem = (id: number) =>
  (dispatch: CKDispatch, getState: () => CKState) => {
    client.deleteItem(selectors(getState()).token, id).then(res => {
      dispatch(fetchList());
    });
  };

export const toggle = (id: number) => (dispatch: CKDispatch, getState: () => CKState) => {
  const completed = getState().groceries.current!.find(e => e.id === id)!.completed;

  const clientMethod = completed ? client.uncompleteItem : client.completeItem;

  clientMethod(selectors(getState()).token, id).then(res => {
    dispatch(fetchList());
  });
};

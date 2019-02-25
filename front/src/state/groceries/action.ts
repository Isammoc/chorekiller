import { reset } from 'redux-form';

import { Item } from '../../model';

import ActionTypes from './actionTypes';

const listRequest = (listId: number) => ({
  type: ActionTypes.LIST_REQUEST,
  payload: listId,
});

const listFailure = (listId: number, err: Error) => ({
  type: ActionTypes.LIST_FAILURE,
  payload: {
    err,
    listId,
  },
  error: true,
});

const listSuccess = (listId: number, items: Item[]) => ({
  type: ActionTypes.LIST_SUCCESS,
  payload: {
    items,
    listId,
  },
});

export const fetchList =
  (listId: number) =>
    (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
      dispatch(listRequest(listId));
      client(dispatch, getState).groceries.fetchItems(listId)
        .then(items => dispatch(listSuccess(listId, items)))
        .catch(err => {
          // tslint:disable-next-line
          console.log('error ???');
          dispatch(listFailure(listId, err));
        });
    };

export const addItem =
  (listId: number, item: string) =>
    (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
      return client(dispatch, getState).groceries.addItem(listId, item).then(res => {
        dispatch(reset('itemToAdd'));
        dispatch(fetchList(listId));
      });
    };

export const deleteItem = (listId: number, id: number) =>
  (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
    client(dispatch, getState).groceries.deleteItem(listId, id).then(res => {
      dispatch(fetchList(listId));
    });
  };

export const toggle = (listId: number, id: number) =>
  (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
    const clientMethod = getState().groceries.items[id].completed
      ? client(dispatch, getState).groceries.uncompleteItem
      : client(dispatch, getState).groceries.completeItem;

    clientMethod(listId, id).then(res => {
      dispatch(fetchList(listId));
    });
  };

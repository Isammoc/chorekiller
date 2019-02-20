import { reset } from 'redux-form';

import { Item } from '../../model';

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

export const fetchList = () => (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
  dispatch(listRequest());
  client(dispatch, getState).groceries.fetchItems(1)
    .then(items => dispatch(listSuccess(items)))
    .catch(err => dispatch(listFailure(err)));
};

export const addItem =
  (item: string) =>
    (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
      return client(dispatch, getState).groceries.addItem(1, item).then(res => {
        dispatch(reset('itemToAdd'));
        dispatch(fetchList());
      });
    };

export const deleteItem = (id: number) =>
  (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
    client(dispatch, getState).groceries.deleteItem(1, id).then(res => {
      dispatch(fetchList());
    });
  };

export const toggle = (id: number) =>
  (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
    const completed = getState().groceries.current!.find(e => e.id === id)!.completed;

    const clientMethod = completed
      ? client(dispatch, getState).groceries.uncompleteItem
      : client(dispatch, getState).groceries.completeItem;

    clientMethod(1, id).then(res => {
      dispatch(fetchList());
    });
  };

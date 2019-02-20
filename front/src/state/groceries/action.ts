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
  client.groceries.fetchItems()
    .then(items => dispatch(listSuccess(items)))
    .catch(err => dispatch(listFailure(err)));
};

export const addItem =
  (item: string) =>
    (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
      return client.groceries.addItem(item).then(res => {
        dispatch(reset('itemToAdd'));
        dispatch(fetchList());
      });
    };

export const deleteItem = (id: number) =>
  (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
    client.groceries.deleteItem(id).then(res => {
      dispatch(fetchList());
    });
  };

export const toggle = (id: number) =>
  (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
    const completed = getState().groceries.current!.find(e => e.id === id)!.completed;

    const clientMethod = completed ? client.groceries.uncompleteItem : client.groceries.completeItem;

    clientMethod(id).then(res => {
      dispatch(fetchList());
    });
  };

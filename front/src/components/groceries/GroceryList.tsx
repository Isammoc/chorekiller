import * as React from 'react';

import { connect } from 'react-redux';

import List from '@material-ui/core/List';

import { Item } from '../../model';
import { deleteItem, toggle } from '../../state/groceries/action';

import Grocery from './Grocery';
import { selectors } from '../../state/root.selector';

type StateProps = {
  items: Item[];
};

type DispatchProps = {
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

type OwnProps = {
  listId: number;
};

type Props = StateProps & DispatchProps & OwnProps;

const GroceryList = ({ items, onDelete, onToggle }: Props) => (
  <List>
    {items && items.map(item =>
      <Grocery key={item.id} {...item} onDelete={() => onDelete(item.id)} onClick={() => onToggle(item.id)} />
    )}
  </List>
);

export default connect(
  (state: CKState, { listId }: OwnProps) => ({
    items: selectors(state).groceries.getItemsForList(listId),
  }),
  (dispatch: CKDispatch, { listId }: OwnProps) => ({
    onToggle: (id: number) => toggle(listId, id),
    onDelete: (id: number) => deleteItem(listId, id),
  }),
)(GroceryList);

import * as React from 'react';

import { connect } from 'react-redux';

import List from '@material-ui/core/List';

import { Item } from '../../model';
import { deleteItem, toggle } from '../../state/groceries/action';

import Grocery from './Grocery';

interface StateProps {
  items: Item[];
}

interface DispatchProps {
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

interface OwnProps {
  listId: number;
}

type Props = StateProps & DispatchProps & OwnProps;

const GroceryList = ({ items, onDelete, onToggle }: Props) => (
  <List>
    {items && items.map(item =>
      <Grocery key={item.id} {...item} onDelete={() => onDelete(item.id)} onClick={() => onToggle(item.id)} />
    )}
  </List>
);

const itemsFromState = (state: Item[] | null) => {
  if (state === null) {
    return null;
  } else {
    return state.slice().sort((a, b) => a.name.localeCompare(b.name));
  }
};

export default connect(
  (state: CKState) => ({
    items: itemsFromState(state.groceries.current),
  }),
  (dispatch: CKDispatch, { listId }: OwnProps) => ({
    onToggle: (id: number) => toggle(listId, id),
    onDelete: (id: number) => deleteItem(listId, id),
  }),
)(GroceryList);

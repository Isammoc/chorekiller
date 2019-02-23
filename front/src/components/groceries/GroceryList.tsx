import * as React from 'react';

import { connect } from 'react-redux';

import List from '@material-ui/core/List';

import { Item } from '../../model';
import { deleteItem, toggle } from '../../state/groceries/action';

import Grocery from './Grocery';

interface GroceryListProps {
  items: Item[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const GroceryList: React.SFC<GroceryListProps> = ({ items, onDelete, onToggle }) => (
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
  {
    onToggle: toggle,
    onDelete: deleteItem,
  }
)(GroceryList);

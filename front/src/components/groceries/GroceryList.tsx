import * as React from 'react';

import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import List from '@material-ui/core/List';

import { Item } from '../../model';
import Grocery from './Grocery';
import { AppState } from '../../state/root.reducer';
import { deleteItem, toggle } from '../../state/groceries/action';

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
  (state: AppState) => ({
    items: itemsFromState(state.groceries.current),
  }),
  (dispatch: ThunkDispatch<AppState, {}, AnyAction>) => ({
    onToggle: (id: number) => { dispatch(toggle(id)); },
    onDelete: (id: number) => { dispatch(deleteItem(id)); },
  })
)(GroceryList);

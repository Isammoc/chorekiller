import * as React from 'react';

import List from '@material-ui/core/List';

import { Item } from '../../model';

import Grocery from './Grocery';

type OwnProps = {
  items: Item[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

type Props = OwnProps;

const GroceryList = ({ items, onDelete, onToggle }: Props) => (
  <List>
    {items && items.map(item =>
      <Grocery key={item.id} {...item} onDelete={() => onDelete(item.id)} onClick={() => onToggle(item.id)} />
    )}
  </List>
);

export default GroceryList;

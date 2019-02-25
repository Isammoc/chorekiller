import * as React from 'react';

import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { Item } from '../../model';
import { selectors } from '../../state/root.selector';
import { addItem, deleteItem, toggle } from '../../state/groceries/action';

import GroceryList from './GroceryList';
import GroceryInput from './GroceryInput';

type OwnProps = {
  listId: number;
};

type StateProps = {
  title: string;
  items: Item[];
};

type DispatchProps = {
  deleteItem: (listId: number, id: number) => void;
  toggle: (listId: number, id: number) => void;
  addItem: (listId: number, item: string) => Promise<void>;
};

type Props = StateProps & DispatchProps & OwnProps;

const GroceryCard =
  ({
    addItem,
    deleteItem,
    items,
    listId,
    title,
    toggle
  }: Props) => (
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <GroceryList
            items={items}
            onDelete={(id: number) => deleteItem(listId, id)}
            onToggle={(id: number) => toggle(listId, id)}
          />
          <GroceryInput onSubmit={(item: string) => addItem(listId, item)} />
        </CardContent>
      </Card>
    );

export default connect(
  (state: CKState, { listId }: OwnProps) => ({
    title: selectors(state).groceries.getList(listId).title,
    items: selectors(state).groceries.getItemsForList(listId),
  }),
  {
    addItem,
    toggle,
    deleteItem,
  },
)(GroceryCard);

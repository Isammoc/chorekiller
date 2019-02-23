import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import GroceryList from './GroceryList';
import GroceryInput from './GroceryInput';

type OwnProps = {
  listId: number;
};

export default ({ listId }: OwnProps) => (
  <Card>
    <CardHeader title="Liste de courses" />
    <CardContent>
      <GroceryList listId={listId} />
      <GroceryInput listId={listId} />
    </CardContent>
  </Card>
);

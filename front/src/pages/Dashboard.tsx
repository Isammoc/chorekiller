import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import GroceryList from '../components/groceries/GroceryList';
import GroceryInput from '../components/groceries/GroceryInput';

export default () => (
  <Card>
    <CardHeader title="Liste de courses" />
    <CardContent>
      <GroceryList />
      <GroceryInput />
    </CardContent>
  </Card>
);

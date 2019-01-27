import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import GroceryList from './groceries/GroceryList';
import GroceryInput from './groceries/GroceryInput';

export default () => (
  <Card>
    <CardContent>
      <Typography variant="h4" component="h4">Liste de courses</Typography>
      <GroceryList />
      <GroceryInput />
    </CardContent>
  </Card>
);

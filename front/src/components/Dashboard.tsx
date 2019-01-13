import * as React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import GroceryList from './groceries/GroceryList';
import GroceryInput from './groceries/GroceryInput';

export default () => (
  <Card>
    <CardContent>
      <Typography variant="h2" component="h2">Liste de courses</Typography>
      <GroceryList />
      <GroceryInput />
    </CardContent>
  </Card>
);

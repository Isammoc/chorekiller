import * as React from 'react';
import { Card, CardContent, Typography } from 'material-ui';
import GroceryList from './groceries/GroceryList';

export default () => (
  <Card>
    <CardContent>
      <Typography variant="headline" component="h2">Liste de courses</Typography>
      <GroceryList />
    </CardContent>
  </Card>
);

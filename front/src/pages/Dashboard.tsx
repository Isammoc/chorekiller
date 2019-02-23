import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import GroceryCard from '../components/groceries/GroceryCard';

export default () => (
  <Card>
    <CardHeader title="Dashboard" />
    <CardContent>
      <GroceryCard listId={1} /> {/* XXX listId*/}
    </CardContent>
  </Card>
);

import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import GroceryCard from '../components/groceries/GroceryCard';
import { connect } from 'react-redux';

type StateProps = {
  listIds: number[];
};

type Props = StateProps;

const Dashboard = ({ listIds }: Props) => (
  <Card>
    <CardHeader title="Dashboard" />
    <CardContent>
      {listIds.map(listId => (
        <GroceryCard listId={listId} key={'list-' + listId} />
      ))}
    </CardContent>
  </Card>
);

export default connect(
  (state: CKState) => ({
    listIds: state.preferences.listIds,
  }),
)(Dashboard);

import * as React from 'react';

import { connect } from 'react-redux';
import { InjectedFormProps, Field, reduxForm } from 'redux-form';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import { addItem } from '../../state/groceries/action';
import TextField from '../utils/TextField';

interface Grocery {
  item: string;
}

interface GroceryFormProps {
  onSubmit: (values: Grocery) => Promise<void>;
}

const GroceryForm = ({ handleSubmit, onSubmit }: GroceryFormProps & InjectedFormProps<Grocery, GroceryFormProps>) => (
  <form style={{ display: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
    <Field name="item" component={TextField} label="Article à ajouter" variant="outlined" style={{ flex: 1 }} />
    <Fab type="submit">
      <AddIcon />
    </Fab>
  </form>
);

export default connect(
  undefined,
  {
    onSubmit: (values: Grocery) => addItem(1, values.item),
  })(reduxForm({
    form: 'itemToAdd',
  })(GroceryForm));

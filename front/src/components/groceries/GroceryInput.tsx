import * as React from 'react';

import { InjectedFormProps, Field, reduxForm } from 'redux-form';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import TextField from '../utils/TextField';

type Grocery = {
  item: string;
};

type OwnProps = {
  onSubmit: (values: string) => Promise<void>;
};

type Props = OwnProps & InjectedFormProps<Grocery, OwnProps>;

const GroceryForm = ({ handleSubmit, onSubmit }: Props) => (
  <form style={{ display: 'flex' }} onSubmit={handleSubmit((values: Grocery) => onSubmit(values.item))}>
    <Field name="item" component={TextField} label="Article à ajouter" variant="outlined" style={{ flex: 1 }} />
    <Fab type="submit">
      <AddIcon />
    </Fab>
  </form>
);

export default reduxForm({
  form: 'itemToAdd',
})(GroceryForm);

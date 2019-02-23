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

interface StateProps { }
interface DispatchProps {
  onSubmit: (values: Grocery) => Promise<void>;
}
interface OwnProps {
  listId: number;
}

type Props = StateProps & DispatchProps & OwnProps & InjectedFormProps<Grocery, StateProps & DispatchProps & OwnProps>;

const GroceryForm = ({ handleSubmit, onSubmit }: Props) => (
  <form style={{ display: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
    <Field name="item" component={TextField} label="Article à ajouter" variant="outlined" style={{ flex: 1 }} />
    <Fab type="submit">
      <AddIcon />
    </Fab>
  </form>
);

export default connect(
  undefined,
  (dispatch: CKDispatch, { listId }: OwnProps) => ({
    onSubmit: (values: Grocery) => addItem(listId, values.item),
  }),
)(
  reduxForm({
    form: 'itemToAdd',
  })(GroceryForm)
);

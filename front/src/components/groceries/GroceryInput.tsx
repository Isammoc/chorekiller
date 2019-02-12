import * as React from 'react';

import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

import { addItem, changeItemToAdd } from '../../state/groceries/action';

interface GroceryInputProps {
  item: string;
  onSubmit: () => void;
  onChange: (item: string) => void;
}

const mySubmit = (onSubmit: () => void) => (event: React.BaseSyntheticEvent) => {
  onSubmit();
  event.preventDefault();
};

const GroceryInput: React.SFC<GroceryInputProps> = ({ item, onSubmit, onChange }) => (
  <form style={{display: 'flex'}} onSubmit={mySubmit(onSubmit)}>
    <TextField
        label="Article à ajouter"
        variant="outlined"
        style={{flex: 1}}
        onChange={e => onChange(e.target.value)}
        value={item}
    />
    <Fab>
      <AddIcon onClick={mySubmit(onSubmit)} />
    </Fab>
  </form>
);

export default connect(
  (state: CKState) => ({
    item: state.groceries.itemToAdd,
  }),
  (dispatch: CKDispatch) => ({
    onSubmit: () => { dispatch(addItem()); },
    onChange: (item: string) => { dispatch(changeItemToAdd(item)); },
  }))(GroceryInput);
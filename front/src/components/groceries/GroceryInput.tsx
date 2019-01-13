import * as React from 'react';
import { Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { AppState } from '../../state/root.reducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
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
  (state: AppState) => ({
    item: state.groceries.itemToAdd,
  }),
  (dispatch: ThunkDispatch<AppState, {}, AnyAction>) => ({
    onSubmit: () => { dispatch(addItem()); },
    onChange: (item: string) => { dispatch(changeItemToAdd(item)); },
  }))(GroceryInput);
import * as React from 'react';

import RemoveCircle from '@material-ui/icons/RemoveCircle';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

interface GroceryProps {
  name: string;
  completed: boolean;
  onClick: () => void;
  onDelete: () => void;
}

const Grocery: React.SFC<GroceryProps> = ({ name, completed, onClick, onDelete }) => (
  <ListItem button={true} onClick={onClick}>
    <Checkbox checked={completed} disableRipple={true} />
    <ListItemText primary={name} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete" onClick={onDelete}>
        <RemoveCircle />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default Grocery;

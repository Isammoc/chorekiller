import * as React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

type OwnProps = {
  name: string;
  completed: boolean;
  onClick: () => void;
  onDelete: () => void;
};

type Props = OwnProps & WithStyles<typeof styles>;

const styles = createStyles({
  completed: {
    textDecoration: 'line-through',
    textDecorationStyle: 'double',
  },
  task: {
    paddingTop: '2px',
    paddingBottom: '2px',
  },
});

const Task = ({ name, completed, onClick, onDelete, classes }: Props) => (
  <ListItem button={true} onClick={onClick} className={classes.task}>
    <Checkbox checked={completed} disableRipple={true} color="primary" />
    <ListItemText primary={name} className={completed ? classes.completed : undefined} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete" onClick={onDelete}>
        <RemoveCircle />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default withStyles(styles)(Task);

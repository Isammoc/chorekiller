import * as React from 'react';

import { InjectedFormProps, Field, reduxForm } from 'redux-form';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import TextField from '../utils/TextField';

type Task = {
  task: string;
};

type OwnProps = {
  onSubmit: (values: string) => Promise<void>;
};

type Props = OwnProps & InjectedFormProps<Task, OwnProps>;

const TaskForm = ({ handleSubmit, onSubmit }: Props) => (
  <form style={{ display: 'flex' }} onSubmit={handleSubmit((values: Task) => onSubmit(values.task))}>
    <Field name="task" component={TextField} label="Article à ajouter" variant="outlined" style={{ flex: 1 }} />
    <Fab type="submit">
      <AddIcon />
    </Fab>
  </form>
);

export default reduxForm({
  form: 'taskToAdd',
})(TaskForm);

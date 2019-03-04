import * as React from 'react';

import List from '@material-ui/core/List';

import { Task } from '../../model';

import TaskComponent from './TaskComponent';

type OwnProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

type Props = OwnProps;

const TaskList = ({ tasks, onDelete, onToggle }: Props) => (
  <List>
    {tasks && tasks.map(task =>
      <TaskComponent key={task.id} {...task} onDelete={() => onDelete(task.id)} onClick={() => onToggle(task.id)} />
    )}
  </List>
);

export default TaskList;

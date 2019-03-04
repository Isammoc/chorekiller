import * as React from 'react';

import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { Task } from '../../model';
import { selectors } from '../../state/root.selector';
import { addTask, deleteTask, toggle, fetchProject } from '../../state/projects/action';

import Loadable from '../utils/Loadable';

import TaskList from './TaskList';
import TaskInput from './TaskInput';

type OwnProps = {
  projectId: number;
};

type StateProps = {
  title: string;
  tasks: Task[];
};

type DispatchProps = {
  deleteTask: (projectId: number, id: number) => void;
  toggle: (projectId: number, id: number) => void;
  addTask: (projectId: number, task: string) => Promise<void>;
};

type Props = StateProps & DispatchProps & OwnProps;

const ProjectCard =
  ({
    addTask,
    deleteTask,
    tasks,
    projectId,
    title,
    toggle
  }: Props) => (
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <TaskList
            tasks={tasks}
            onDelete={(id: number) => deleteTask(projectId, id)}
            onToggle={(id: number) => toggle(projectId, id)}
          />
          <TaskInput onSubmit={(task: string) => addTask(projectId, task)} />
        </CardContent>
      </Card>
    );

const ConnectedProjectCard = connect(
  (state: CKState, { projectId }: OwnProps) => ({
    title: selectors(state).projects.getProject(projectId).title,
    tasks: selectors(state).projects.getTasksForProject(projectId),
  }),
  {
    addTask,
    toggle,
    deleteTask,
  },
)(ProjectCard);

type LoadableProps = {
  loading: boolean;
  projectId: number;
  error?: string;
  onLoad?: () => void;
};

const LoadableProjectCard = ({ loading, projectId, error, onLoad }: LoadableProps) => {
  if (onLoad) {
    React.useEffect(onLoad, []);
  }
  return (
    <Loadable loading={loading} error={error}>
      <ConnectedProjectCard projectId={projectId} />
    </Loadable>
  );
};

export default connect(
  (state: CKState, { projectId }: OwnProps) => {
    const loadableProject = selectors(state).projects.getLoadableProject(projectId);
    return {
      loading: !loadableProject || (
        loadableProject.loading && !loadableProject.current
      ),
      error: loadableProject && loadableProject.error,
    };
  },
  (dispatch: CKDispatch, { projectId }: OwnProps) => ({
    onLoad: () => dispatch(fetchProject(projectId))
  }),
)(LoadableProjectCard);

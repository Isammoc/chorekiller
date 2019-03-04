import { reset } from 'redux-form';

import { Task } from '../../model';

import ActionTypes from './actionTypes';

const projectRequest = (projectId: number) => ({
  type: ActionTypes.PROJECT_REQUEST,
  payload: projectId,
});

const projectFailure = (projectId: number, err: Error) => ({
  type: ActionTypes.PROJECT_FAILURE,
  payload: {
    err,
    projectId,
  },
  error: true,
});

const projectSuccess = (projectId: number, tasks: Task[]) => ({
  type: ActionTypes.PROJECT_SUCCESS,
  payload: {
    tasks,
    projectId,
  },
});

export const fetchProject =
  (projectId: number) =>
    (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
      dispatch(projectRequest(projectId));
      client(dispatch, getState).tasks.fetchTasks(projectId)
        .then(tasks => dispatch(projectSuccess(projectId, tasks)))
        .catch(err => dispatch(projectFailure(projectId, err)));
    };

export const addTask =
  (projectId: number, task: string) =>
    (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
      return client(dispatch, getState).tasks.addTask(projectId, task).then(res => {
        dispatch(reset('taskToAdd'));
        dispatch(fetchProject(projectId));
      });
    };

export const deleteTask = (projectId: number, id: number) =>
  (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
    client(dispatch, getState).tasks.deleteTask(projectId, id).then(res => {
      dispatch(fetchProject(projectId));
    });
  };

export const toggle = (projectId: number, id: number) =>
  (dispatch: CKDispatch, getState: () => CKState, { client }: CKThunkExtraParams) => {
    const clientMethod = getState().projects.tasks[id].completed
      ? client(dispatch, getState).tasks.uncompleteTask
      : client(dispatch, getState).tasks.completeTask;

    clientMethod(projectId, id).then(res => {
      dispatch(fetchProject(projectId));
    });
  };

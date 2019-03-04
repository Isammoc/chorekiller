import { Reducer } from 'redux';

import { ProjectState, Task } from '../../model';

import ActionTypes from './actionTypes';
import { arrayToObject } from '../utils';

const defaultState: ProjectState = {
  projects: {},
  tasks: {},
};

const reducer: Reducer<ProjectState, CKAction> =
  (state: ProjectState = defaultState, action: CKAction) => {
    switch (action.type) {
      case ActionTypes.PROJECT_REQUEST:
        return {
          ...state,
          projects: {
            ...state.projects,
            [action.payload]: {
              ...state.projects[action.payload],
              loading: true,
              error: undefined,
            },
          },
        };
      case ActionTypes.PROJECT_FAILURE:
        return {
          ...state,
          projects: {
            ...state.projects,
            [action.payload.listId]: {
              loading: false,
              error: action.payload.error,
            },
          },
        };
      case ActionTypes.PROJECT_SUCCESS:
        return {
          ...state,
          projects: {
            ...state.projects,
            [action.payload.projectId]: {
              loading: false,
              error: undefined,
              current: {
                title: 'Liste de courses',
                tasks: action.payload.tasks.map((task: Task) => task.id),
              },
            },
          },
          tasks: {
            ...state.tasks,
            ...arrayToObject(action.payload.tasks, 'id'),
          }
        };
      default:
        return state;
    }
  };

export default reducer;

import { combineReducers } from 'redux';

import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { reducer as form, FormStateMap } from 'redux-form';

import { ProjectState, UserState } from '../model';

import currentUser from './login/reducer';
import projects from './projects/reducer';
import preferences, { PreferencesState } from './preferences/reducer';
import profiles, { ProfileState } from './profile/reducer';

const rootReducer = (history: History) => combineReducers<AppState>({
  currentUser,
  form,
  projects,
  preferences,
  profiles,
  router: connectRouter(history),
});

export default rootReducer;

export type AppState = {
  currentUser: UserState,
  form: FormStateMap,
  projects: ProjectState,
  preferences: PreferencesState,
  profiles: ProfileState,
  router: RouterState,
};

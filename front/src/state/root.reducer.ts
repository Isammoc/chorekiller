import { combineReducers } from 'redux';

import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { reducer as form, FormStateMap } from 'redux-form';

import { GroceryState, UserState } from '../model';

import currentUser from './login/reducer';
import groceries from './groceries/reducer';
import preferences, { PreferencesState } from './preferences/reducer';
import profiles, { ProfileState } from './profile/reducer';

const rootReducer = (history: History) => combineReducers<AppState>({
  currentUser,
  form,
  groceries,
  preferences,
  profiles,
  router: connectRouter(history),
});

export default rootReducer;

export type AppState = {
  currentUser: UserState,
  form: FormStateMap,
  groceries: GroceryState,
  preferences: PreferencesState,
  profiles: ProfileState,
  router: RouterState,
};

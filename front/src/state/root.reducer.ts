import { combineReducers } from 'redux';

import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { GroceryState, UserState } from '../model';

import currentUser from './login/reducer';
import groceries from './groceries/reducer';

const rootReducer = (history: History) => combineReducers<AppState>({
  router: connectRouter(history),
  currentUser,
  groceries,
});

export default rootReducer;

export type AppState = {
  router: RouterState,
  currentUser: UserState,
  groceries: GroceryState,
};

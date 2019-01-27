import { combineReducers } from 'redux';

import { GroceryState, UserState } from '../model';

import currentUser from './login/reducer';
import groceries from './groceries/reducer';

const rootReducer = combineReducers({
  currentUser,
  groceries,
});

export default rootReducer;

export type AppState = {
  currentUser: UserState,
  groceries: GroceryState,
};

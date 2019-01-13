import { combineReducers } from 'redux';

import currentUser from './login/reducer';
import groceries from './groceries/reducer';
import { GroceryState, UserState } from '../model';

const rootReducer = combineReducers({
  currentUser,
  groceries,
});

export default rootReducer;

export type AppState = {
  currentUser: UserState,
  groceries: GroceryState,
};

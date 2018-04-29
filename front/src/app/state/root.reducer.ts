import { combineReducers } from 'redux';

import loginReducer, { UserState } from './login.duck';
import groceriesReducer, { GroceryState } from './groceries.duck';

const rootReducer = combineReducers({
  currentUser: loginReducer,
  groceries: groceriesReducer,
});

export default rootReducer;

export type AppState = {
  currentUser: UserState,
  groceries: GroceryState,
};

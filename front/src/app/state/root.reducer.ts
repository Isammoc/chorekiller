import { combineReducers } from 'redux';

import loginReducer, { UserState } from './login.duck';

const rootReducer = combineReducers({
  currentUser: loginReducer,
});

export default rootReducer;

export type AppState = {
  currentUser: UserState
};

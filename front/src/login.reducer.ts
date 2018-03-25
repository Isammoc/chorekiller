import { AnyAction } from 'redux';

// Actions
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const defaultCurrentUser: PossibleState<User> = {
  current: null,
  status: 'none'
};

// Reducer
const loginReducer = (state: PossibleState<User> = defaultCurrentUser, action: AnyAction) => {
  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, state, { status: 'pending' });
    case CLOSE_MODAL:
      return Object.assign({}, state, { status: 'none' });
    default:
      return state;
  }
};

export default loginReducer;

// Action Creators
export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export interface PossibleState<P> {
  current: P | null;
  status: 'none' | 'pending' | 'alive';
}

export interface User {
  login: string;
  name: string;
}

export type UserState = PossibleState<User>;

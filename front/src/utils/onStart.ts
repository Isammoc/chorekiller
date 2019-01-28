import { Store, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { loadToken } from '../state/login/action';
import { AppState } from '../state/root.reducer';

import { addLocationListener } from './onLocationChange';

export default function (store: Store) {
  loadToken(store.dispatch);

  // samples
  addLocationListener(
    {
      path: '/profile/:id',
      exact: true,
    },
    ({ id }) => {
      return { type: 'COUCOU', payload: id };
    }
  );
  addLocationListener(
    {
      path: '/profile/:id',
      exact: true,
    },
    ({ id }) => (dispatch: ThunkDispatch<AppState, {}, AnyAction>) => {
      setTimeout(() => dispatch({ type: 'HELLO', payload: id }), 2000);
    }
  );
}

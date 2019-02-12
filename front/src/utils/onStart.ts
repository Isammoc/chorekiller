import { Store } from 'redux';

import { loadToken } from '../state/login/action';

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
    ({ id }) => (dispatch: CKDispatch) => {
      setTimeout(() => dispatch({ type: 'HELLO', payload: id }), 2000);
    }
  );
}

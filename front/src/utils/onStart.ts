import { Store } from 'redux';

import { loadToken } from '../state/login/action';

export default function (store: Store) {
  loadToken(store.dispatch, store.getState);
}

import { AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { matchPath, RouteProps } from 'react-router';
import { Location, Action } from 'history';

import { AppState } from '../state/root.reducer';

type ActionCreator = ((params: { [name: string]: string }) => ThunkAction<void, AppState, void, AnyAction>) |
((params: { [name: string]: string }) => AnyAction);

interface Listener {
  props: RouteProps;
  actionCreator: ActionCreator;
}

const locationActions: Listener[] = [];

export const onLocationChange =
  (getState: () => AppState, dispatch: ThunkDispatch<AppState, {}, AnyAction>) =>
    (location: Location, action: Action | undefined) => {
      locationActions.forEach((la) => {
        const match = matchPath<{ [name: string]: string }>(location.pathname, la.props);
        if (match) {
          const matchAction = la.actionCreator(match.params);
          dispatch(matchAction as AnyAction);
        }
      });
    };

export const addLocationListener =
  (props: RouteProps, actionCreator: ActionCreator) => {
    locationActions.push({ props, actionCreator });
  };

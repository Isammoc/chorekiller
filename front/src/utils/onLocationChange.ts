import { ThunkAction } from 'redux-thunk';
import { matchPath, RouteProps } from 'react-router';
import { Location, Action } from 'history';

type ActionCreator = ((params: { [name: string]: string }) => ThunkAction<void, CKState, void, CKAction>) |
((params: { [name: string]: string }) => CKAction);

interface Listener {
  props: RouteProps;
  actionCreator: ActionCreator;
}

const locationActions: Listener[] = [];

export const onLocationChange =
  (getState: () => CKState, dispatch: CKDispatch) =>
    (location: Location, action: Action | undefined) => {
      locationActions.forEach((la) => {
        const match = matchPath<{ [name: string]: string }>(location.pathname, la.props);
        if (match) {
          const matchAction = la.actionCreator(match.params);
          dispatch(matchAction as CKAction);
        }
      });
    };

export const addLocationListener =
  (props: RouteProps, actionCreator: ActionCreator) => {
    locationActions.push({ props, actionCreator });
  };

import * as React from 'react';

import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { createMatchSelector } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Work from '@material-ui/icons/Work';

import { AppState } from '../state/root.reducer';
import { Profile } from '../state/profile/reducer';
import { loadProfile } from '../state/profile/action';

interface ProfileProps {
  who: string;
  profile?: Profile;
  onLoad: (id: string) => void;
}

const Profile: React.SFC<ProfileProps> = ({ who, profile, onLoad }) => {
  React.useEffect(() => {
    if (!profile) {
      onLoad(who);
    }
  });

  const displayName = profile ? profile.displayName : 'loading...';
  const isAdmin = profile && profile.isAdmin;

  return (
    <Card>
      <CardHeader
        title={
          <React.Fragment>
            {'Profile ' + who}
            {isAdmin && <React.Fragment>&nbsp;<Work /></React.Fragment>}
          </React.Fragment>
        }
      />
      <CardContent>
        Nom affiché : {displayName}
      </CardContent>
    </Card>
  );
};

export default connect(
  (state: AppState) => {
    const id = createMatchSelector<AppState, { id: string }>('/profile/:id')(state)!.params.id;
    return {
      who: id,
      profile: state.profiles[id],
    };
  },
  (dispatch: ThunkDispatch<AppState, {}, AnyAction>) => ({
    onLoad: (id: string) => {
      dispatch(loadProfile(id));
    },
  }),
)(Profile);

import * as React from 'react';

import { connect } from 'react-redux';
import { createMatchSelector } from 'connected-react-router';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Work from '@material-ui/icons/Work';

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
  (state: CKState) => {
    const id = createMatchSelector<CKState, { id: string }>('/profile/:id')(state)!.params.id;
    return {
      who: id,
      profile: state.profiles[id],
    };
  },
  (dispatch: CKDispatch) => ({
    onLoad: (id: string) => {
      dispatch(loadProfile(id));
    },
  }),
)(Profile);

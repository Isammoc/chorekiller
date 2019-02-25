import * as React from 'react';

import { connect } from 'react-redux';
import { createMatchSelector } from 'connected-react-router';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Work from '@material-ui/icons/Work';

import { Profile } from '../state/profile/reducer';
import { loadProfile } from '../state/profile/action';
import PasswordForm from '../components/PasswordForm';
import { selectors } from '../state/root.selector';

type Props = {
  who: string;
  profile?: Profile;
  currentUser: boolean;
  onLoad: (id: string) => void;
};

const Profile = ({ currentUser, who, profile, onLoad }: Props) => {
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
        {currentUser && <PasswordForm />}
      </CardContent>
    </Card>
  );
};

export default connect(
  (state: CKState) => {
    const id = createMatchSelector<CKState, { id: string }>('/profile/:id')(state)!.params.id;
    return {
      who: id,
      profile: selectors(state).profiles.getProfile(id),
      currentUser: selectors(state).user.isCurrentLogin(id),
    };
  },
  {
    onLoad: loadProfile,
  },
)(Profile);

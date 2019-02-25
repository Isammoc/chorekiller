import * as React from 'react';

import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Work from '@material-ui/icons/Work';

import { Profile } from '../state/profile/reducer';
import { loadProfile } from '../state/profile/action';
import { selectors } from '../state/root.selector';

import PasswordForm from './PasswordForm';
import Loadable from './utils/Loadable';

type OwnProps = {
  who: string;
};

type Props = OwnProps & {
  profile?: Profile;
  currentUser: boolean;
  onLoad: () => void;
};

type SimpleProps = {
  profile: Profile;
  currentUser: boolean;
};

const Profile = ({ currentUser, profile }: SimpleProps) => (
  <Card>
    <CardHeader
      title={
        <React.Fragment>
          {'Profile ' + profile.login}
          {profile.isAdmin && <React.Fragment>&nbsp;<Work /></React.Fragment>}
        </React.Fragment>
      }
    />
    <CardContent>
      Nom affiché : {profile.displayName}
      {currentUser && <PasswordForm />}
    </CardContent>
  </Card>
);

const LoadableProfile = ({ currentUser, who, profile, onLoad }: Props) => {
  React.useEffect(onLoad, []);

  return (
    <Loadable loading={!profile} error={undefined}>
      <Profile currentUser={currentUser} profile={profile!} />
    </Loadable>
  );
};

export default connect(
  (state: CKState, { who }: OwnProps) => ({
    profile: selectors(state).profiles.getProfile(who),
    currentUser: selectors(state).user.isCurrentLogin(who),
  }),
  (dispatch: CKDispatch, { who }: OwnProps) => ({
    onLoad: () => dispatch(loadProfile(who)),
  }),
)(LoadableProfile);

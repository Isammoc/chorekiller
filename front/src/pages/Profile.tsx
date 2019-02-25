import * as React from 'react';

import { connect } from 'react-redux';
import { createMatchSelector } from 'connected-react-router';

import ProfileCard from '../components/ProfileCard';

type Props = {
  who: string;
};

const ProfilePage = ({ who }: Props) => (
  <ProfileCard who={who} />
);

export default connect(
  (state: CKState) => ({
    who: createMatchSelector<CKState, { id: string }>('/profile/:id')(state)!.params.id,
  }),
)(ProfilePage);

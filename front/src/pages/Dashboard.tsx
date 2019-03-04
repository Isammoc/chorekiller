import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import ProjectCard from '../components/tasks/ProjectCard';
import { connect } from 'react-redux';

type StateProps = {
  projectIds: number[];
};

type Props = StateProps;

const Dashboard = ({ projectIds }: Props) => (
  <Card>
    <CardHeader title="Dashboard" />
    <CardContent>
      {projectIds.map(projectId => (
        <ProjectCard projectId={projectId} key={'project-' + projectId} />
      ))}
    </CardContent>
  </Card>
);

export default connect(
  (state: CKState) => ({
    projectIds: state.preferences.projectIds,
  }),
)(Dashboard);

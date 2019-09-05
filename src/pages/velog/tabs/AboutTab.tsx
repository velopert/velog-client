import React from 'react';
import VelogAbout from '../../../containers/velog/VelogAbout';
import { RouteComponentProps } from 'react-router';

export interface AboutTabProps
  extends RouteComponentProps<{
    username: string;
  }> {}

const AboutTab = ({ match }: AboutTabProps) => {
  return <VelogAbout username={match.params.username} />;
};

export default AboutTab;

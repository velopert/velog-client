import * as React from 'react';
import VelogPageTemplate from '../../components/velog/VelogPageTemplate';
import { RouteComponentProps } from 'react-router';
import ConfigLoader from '../../containers/velog/ConfigLoader';

export interface VelogPageProps
  extends RouteComponentProps<{
    username: string;
  }> {}

const VelogPage: React.FC<VelogPageProps> = ({ match }) => {
  return (
    <VelogPageTemplate>
      <ConfigLoader username={match.params.username} />
    </VelogPageTemplate>
  );
};

export default VelogPage;

import * as React from 'react';
import VelogPageTemplate from '../../components/velog/VelogPageTemplate';
import { RouteComponentProps, Route } from 'react-router';
import ConfigLoader from '../../containers/velog/ConfigLoader';
import PostViewer from '../../containers/post/PostViewer';
import PostPage from './PostPage';

export interface VelogPageProps
  extends RouteComponentProps<{
    username: string;
  }> {}

const VelogPage: React.FC<VelogPageProps> = ({ match }) => {
  const { username } = match.params;
  return (
    <VelogPageTemplate>
      <ConfigLoader username={username} />
      <Route path="/@:username/:urlSlug" component={PostPage} />
    </VelogPageTemplate>
  );
};

export default VelogPage;

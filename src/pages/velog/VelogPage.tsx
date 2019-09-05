import * as React from 'react';
import VelogPageTemplate from '../../components/velog/VelogPageTemplate';
import { RouteComponentProps, Route, Switch, Router } from 'react-router';
import ConfigLoader from '../../containers/velog/ConfigLoader';
import PostPage from './PostPage';
import UserPage from './UserPage';
import SeriesPage from './SeriesPage';

export interface VelogPageProps
  extends RouteComponentProps<{
    username: string;
  }> {}

const VelogPage: React.FC<VelogPageProps> = ({ match }) => {
  const { username } = match.params;
  return (
    <VelogPageTemplate>
      <ConfigLoader username={username} />
      <Switch>
        <Route
          path={['/@:username', '/@:username/:tab(series|about)']}
          component={UserPage}
          exact
        />
        <Route path="/@:username/series/:urlSlug" component={SeriesPage} />
        <Route path="/@:username/:urlSlug" component={PostPage} />
      </Switch>
    </VelogPageTemplate>
  );
};

export default VelogPage;

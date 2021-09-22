import * as React from 'react';
import VelogPageTemplate from '../../components/velog/VelogPageTemplate';
import { RouteComponentProps, Route, Switch } from 'react-router';
// import loadable from '@loadable/component';
import useApplyVelogConfig from '../../containers/velog/hooks/useApplyVelogConfig';

const PostPage = loadable(() => import('./PostPage'));
const UserPage = loadable(() => import('./UserPage'));
const SeriesPage = loadable(() => import('./SeriesPage'));

export interface VelogPageProps
  extends RouteComponentProps<{
    username: string;
  }> {}

const VelogPage: React.FC<VelogPageProps> = ({ match }) => {
  const { username } = match.params;
  useApplyVelogConfig(username);
  return (
    <VelogPageTemplate>
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

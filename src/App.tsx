import * as React from 'react';
import { Route, Switch } from 'react-router';
// import MainPage from './pages/main/MainPage';
// import PostPage from './pages/PostPage';

import loadable from '@loadable/component';
import Core from './containers/base/Core';
import RegisterPage from './pages/RegisterPage';
const MainPage = loadable(() => import('./pages/main/MainPage'));
const PostPage = loadable(() => import('./pages/PostPage'));
import EmailLoginPage from './pages/EmailLoginPage';
import WritePage from './pages/WritePage';

interface AppProps {}

const App: React.SFC<AppProps> = props => {
  return (
    <>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/register" component={RegisterPage} />
        <Route path="/:mode(trending|recent|following)" component={MainPage} />
        <Route path="/@:username/:urlSlug" component={PostPage} />
        <Route path="/email-login" component={EmailLoginPage} />
        <Route path="/write" component={WritePage} />
      </Switch>
      <Core />
    </>
  );
};

export default App;

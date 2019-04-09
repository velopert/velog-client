import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import loadable from '@loadable/component';
import Core from './containers/base/Core';
import RegisterPage from './pages/RegisterPage';

const MainPage = loadable(() => import('./pages/main/MainPage'));
const PostPage = loadable(() => import('./pages/PostPage'));
const EmailLoginPage = loadable(() => import('./pages/EmailLoginPage'));
const WritePage = loadable(() => import('./pages/WritePage'));

const App: FC = () => {
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

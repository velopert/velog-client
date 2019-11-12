import * as React from 'react';
import { Route, Switch } from 'react-router';
// import MainPage from './pages/main/MainPage';
// import PostPage from './pages/PostPage';

import loadable from '@loadable/component';
import Core from './containers/base/Core';
import RegisterPage from './pages/RegisterPage';
import { JazzbarProvider } from './lib/jazzbar';
const MainPage = loadable(() => import('./pages/main/MainPage'));
const EmailLoginPage = loadable(() => import('./pages/EmailLoginPage'));
const WritePage = loadable(() => import('./pages/WritePage'));
const VelogPage = loadable(() => import('./pages/velog/VelogPage'));
const SearchPage = loadable(() => import('./pages/SearchPage'));
const SavesPage = loadable(() => import('./pages/SavesPage'));
const TagsPage = loadable(() => import('./pages/tags/TagsPage'));
const PolicyPage = loadable(() => import('./pages/PolicyPage'));
const SettingPage = loadable(() => import('./pages/SettingPage'));

interface AppProps {}

const App: React.FC<AppProps> = props => {
  return (
    <JazzbarProvider>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/register" component={RegisterPage} />
        <Route path="/:mode(trending|recent|following)" component={MainPage} />
        <Route path="/@:username" component={VelogPage} />
        {/* <Route path="/@:username/:urlSlug" component={PostPage} /> */}
        <Route path="/email-login" component={EmailLoginPage} />
        <Route path="/write" component={WritePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/saves" component={SavesPage} />
        <Route path="/tags" component={TagsPage} />
        <Route path={['/policy/:type?']} component={PolicyPage} />
        <Route path="/setting" component={SettingPage} />
      </Switch>
      <Core />
    </JazzbarProvider>
  );
};

export default App;

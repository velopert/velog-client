import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
// import MainPage from './pages/main/MainPage';
// import PostPage from './pages/PostPage';

import loadable from '@loadable/component';
import Core from './containers/base/Core';
import RegisterPage from './pages/RegisterPage';
import { JazzbarProvider } from './lib/jazzbar';
import PageTemplate from './components/base/PageTemplate';
import VelogPageFallback from './containers/velog/VelogPageFallback';

const loadableConfig = {
  fallback: <PageTemplate />,
};

const VelogPage = loadable(() => import('./pages/velog/VelogPage'), {
  fallback: <VelogPageFallback />,
});
const MainPage = loadable(
  () => import('./pages/main/MainPage'),
  loadableConfig,
);
const EmailLoginPage = loadable(
  () => import('./pages/EmailLoginPage'),
  loadableConfig,
);
const WritePage = loadable(() => import('./pages/WritePage'), loadableConfig);
const SearchPage = loadable(() => import('./pages/SearchPage'), loadableConfig);
const SavesPage = loadable(() => import('./pages/SavesPage'), loadableConfig);
const TagsPage = loadable(
  () => import('./pages/tags/TagsPage'),
  loadableConfig,
);
const PolicyPage = loadable(() => import('./pages/PolicyPage'), loadableConfig);
const SettingPage = loadable(
  () => import('./pages/SettingPage'),
  loadableConfig,
);

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

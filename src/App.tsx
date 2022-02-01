import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import PostPage from './pages/PostPage';

import loadable from '@loadable/component';
import Core from './containers/base/Core';
import RegisterPage from './pages/RegisterPage';
import { JazzbarProvider } from './lib/jazzbar';
import PageTemplate from './components/base/PageTemplate';
import VelogPageFallback from './containers/velog/VelogPageFallback';
import ErrorBoundary from './components/error/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';
import { Helmet } from 'react-helmet-async';
import HomePage from './pages/home/HomePage';
import MainPageTemplate from './components/main/MainPageTemplate';

const loadableConfig = {
  fallback: <PageTemplate />,
};

const VelogPage = loadable(() => import('./pages/velog/VelogPage'), {
  fallback: <VelogPageFallback />,
});

const EmailLoginPage = loadable(
  () => import('./pages/EmailLoginPage'),
  loadableConfig,
);
const WritePage = loadable(() => import('./pages/WritePage'));
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
const SuccessPage = loadable(() => import('./pages/SuccessPage'));
const ReadingListPage = loadable(
  () => import('./pages/readingList/ReadingListPage'),
  {
    fallback: <MainPageTemplate />,
  },
);

const PostStatsPage = loadable(() => import('./pages/PostStatsPage'));

interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  return (
    <JazzbarProvider>
      <Helmet>
        <title>velog</title>
        <meta
          name="description"
          content="개발자들을 위한 블로그 서비스. 어디서 글 쓸지 고민하지 말고 벨로그에서 시작하세요."
        />
        <meta property="fb:app_id" content="203040656938507" />
        <meta property="og:image" content="https://images.velog.io/velog.png" />
      </Helmet>
      <ErrorBoundary>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route
            path="/:mode(trending|recent|following)"
            component={HomePage}
          />

          <Route path="/register" component={RegisterPage} />
          <Route path="/@:username" component={VelogPage} />
          {/* <Route path="/@:username/:urlSlug" component={PostPage} /> */}
          <Route path="/email-login" component={EmailLoginPage} />
          <Route path="/write" component={WritePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/saves" component={SavesPage} />
          <Route path="/tags" component={TagsPage} />
          <Route path={['/policy/:type?']} component={PolicyPage} />
          <Route path="/setting" component={SettingPage} />
          <Route path="/success" component={SuccessPage} />
          <Route path="/lists/:type(liked|read)" component={ReadingListPage} />
          <Route path="/lists" render={() => <Redirect to="/lists/liked" />} />
          <Route path="/post-stats/:postId" component={PostStatsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ErrorBoundary>
      <Core />
    </JazzbarProvider>
  );
};

export default App;

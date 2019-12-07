import * as React from 'react';
import { Route } from 'react-router-dom';
import MainTemplate from '../../components/main/MainTemplate';
import MainSideMenu from '../../components/main/MainSideMenu';
import MainRightFooter from '../../components/main/MainRightFooter';
import RecentPostsPage from './RecentPostsPage';
import TrendingPostsPage from './TrendingPostsPage';
import MainTagWidgetContainer from '../../containers/main/MainTagWidgetContainer';
import MainNoticeWidgetContainer from '../../containers/main/MainNoticeWidgetContainer';
import MainMobileHead from '../../components/main/MainMobileHead';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  return (
    <MainTemplate>
      <MainTemplate.Left>
        <MainSideMenu />
      </MainTemplate.Left>
      <MainTemplate.Main>
        <MainMobileHead />
        <Route path={['/', '/trending']} component={TrendingPostsPage} exact />
        <Route path="/recent" component={RecentPostsPage} />
      </MainTemplate.Main>
      <MainTemplate.Right>
        <MainNoticeWidgetContainer />
        <MainTagWidgetContainer />
        <MainRightFooter />
      </MainTemplate.Right>
    </MainTemplate>
  );
};

export default MainPage;

import React from 'react';
import MainTemplate from '../../components/main/MainTemplate';
import MainHeader from '../../components/main/MainHeader';
import HomeTab from '../../components/home/HomeTab';
import MainResponsive from '../../components/main/MainResponsive';
import HomeLayout from '../../components/home/HomeLayout';
import { Route } from 'react-router-dom';
import TrendingPostsPage from './TrendingPostsPage';
import RecentPostsPage from './RecentPostsPage';
import HomeSidebar from '../../components/home/HomeSidebar';
import FloatingMainHeader from '../../components/main/FloatingHomeHeader';

export type HomePageProps = {};

function HomePage(props: HomePageProps) {
  return (
    <MainTemplate>
      <MainHeader />
      <FloatingMainHeader />
      <MainResponsive>
        <HomeTab />
        <HomeLayout
          main={
            <>
              <Route
                path={['/', '/trending']}
                component={TrendingPostsPage}
                exact
              />
              <Route path={['/recent']} component={RecentPostsPage} />
            </>
          }
          side={<HomeSidebar />}
        />
      </MainResponsive>
    </MainTemplate>
  );
}

export default HomePage;

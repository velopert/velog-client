import React from 'react';
import MainTemplate from '../../components/main/MainTemplate';
import Header from '../../components/base/Header';
import HomeTab from '../../components/home/HomeTab';
import MainResponsive from '../../components/main/MainResponsive';
import HomeLayout from '../../components/home/HomeLayout';
import { Route } from 'react-router-dom';
import TrendingPostsPage from './TrendingPostsPage';
import RecentPostsPage from './RecentPostsPage';
import HomeSidebar from '../../components/home/HomeSidebar';
import FloatingHeader from '../../components/base/FloatingHeader';

export type HomePageProps = {};

function HomePage(props: HomePageProps) {
  return (
    <MainTemplate>
      <Header />
      <FloatingHeader />
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
        />
      </MainResponsive>
    </MainTemplate>
  );
}

export default HomePage;

import React from 'react';
import HomeTemplate from '../../components/home/HomeTemplate';
import HomeHeader from '../../components/home/HomeHeader';
import HomeTab from '../../components/home/HomeTab';
import HomeResponsive from '../../components/home/HomeResponsive';
import HomeLayout from '../../components/home/HomeLayout';
import { Route } from 'react-router-dom';
import TrendingPostsPage from './TrendingPostsPage';
import RecentPostsPage from './RecentPostsPage';

export type HomePageProps = {};

function HomePage(props: HomePageProps) {
  return (
    <HomeTemplate>
      <HomeHeader />
      <HomeResponsive>
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
          side={<div>Hello</div>}
        />
      </HomeResponsive>
    </HomeTemplate>
  );
}

export default HomePage;

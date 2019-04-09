import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import MainTemplate from '../../components/main/MainTemplate';
import MainSideMenu from '../../components/main/MainSideMenu';
import MainNoticeWidget from '../../components/main/MainNoticeWidget';
import MainRightFooter from '../../components/main/MainRightFooter';
import RecentPostsPage from './RecentPostsPage';

interface MainPageProps {}

const MainPage: React.SFC<MainPageProps> = props => {
  return (
    <MainTemplate>
      <MainTemplate.Left>
        <MainSideMenu />
      </MainTemplate.Left>
      <MainTemplate.Main>
        <Route path="/recent" component={RecentPostsPage} />
      </MainTemplate.Main>
      <MainTemplate.Right>
        <MainNoticeWidget />
        <MainRightFooter />
      </MainTemplate.Right>
    </MainTemplate>
  );
};

export default MainPage;

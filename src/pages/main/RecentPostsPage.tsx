import React, { FC } from 'react';
import styled from 'styled-components';
import RecentPosts from '../../containers/main/RecentPosts';

const RecentPostsPageBlock = styled.div``;

interface RecentPostsPageProps {}

const RecentPostsPage: FC<RecentPostsPageProps> = props => {
  return (
    <RecentPostsPageBlock>
      <RecentPosts />
    </RecentPostsPageBlock>
  );
};

export default RecentPostsPage;

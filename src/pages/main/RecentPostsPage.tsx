import React, { FC } from 'react';
import styled from 'styled-components';
import RecentPosts from '../../containers/main/RecentPosts';

const RecentPostsPageBlock = styled.div``;

const RecentPostsPage: FC = () => {
  return (
    <RecentPostsPageBlock>
      <RecentPosts />
    </RecentPostsPageBlock>
  );
};

export default RecentPostsPage;

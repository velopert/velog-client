import React from 'react';
import styled from 'styled-components';

import RecentPosts from '../../containers/main/RecentPosts';

const RecentPostsPageBlock = styled.div``;

interface RecentPostsPageProps {}

const RecentPostsPage: React.SFC<RecentPostsPageProps> = props => {
  return (
    <RecentPostsPageBlock>
      <RecentPosts />
    </RecentPostsPageBlock>
  );
};

export default RecentPostsPage;

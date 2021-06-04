import React, { useEffect } from 'react';
import styled from 'styled-components';
import PageTemplate from '../components/base/PageTemplate';
import media from '../lib/styles/media';
import { Helmet } from 'react-helmet-async';
import PostStats from '../components/postStats/PostStats';

function PostStatsPage() {
  useEffect(() => {}, []);
  return (
    <StatsTemplate>
      <Helmet>
        <title>포스트 통계 - velog</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main>
        <PostStats />
      </main>
    </StatsTemplate>
  );
}

const StatsTemplate = styled(PageTemplate)`
  main {
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    width: 1440px;
    padding-bottom: 5rem;
    ${media.xlarge} {
      width: 100%;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    ${media.small} {
      width: 100%;
      margin-top: 1.5rem;
    }
  }
`;

export default PostStatsPage;

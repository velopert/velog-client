import React from 'react';
import PostCardGrid from '../../components/common/PostCardGrid';
import useTrendingPosts from './hooks/useTrendingPosts';
import { Helmet } from 'react-helmet-async';

export type TrendingPageProps = {};

function TrendingPage(props: TrendingPageProps) {
  const { data, loading } = useTrendingPosts();

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://velog.io/" />
      </Helmet>
      <PostCardGrid
        posts={data?.trendingPosts || []}
        forHome
        loading={!data || loading}
      />
    </>
  );
}

export default TrendingPage;

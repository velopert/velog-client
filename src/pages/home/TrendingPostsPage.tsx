import React from 'react';
import PostCardGrid from '../../components/common/PostCardGrid';
import useTrendingPosts from './hooks/useTrendingPosts';

export type TrendingPageProps = {};

function TrendingPage(props: TrendingPageProps) {
  const { data, loading } = useTrendingPosts();

  if (!data) return null;
  return <PostCardGrid posts={data.trendingPosts} />;
}

export default TrendingPage;

import React from 'react';
import PostCardGrid from '../../components/common/PostCardGrid';
import useTrendingPosts from './hooks/useTrendingPosts';

export type TrendingPageProps = {};

function TrendingPage(props: TrendingPageProps) {
  const { data, loading } = useTrendingPosts();

  return <PostCardGrid />;
}

export default TrendingPage;

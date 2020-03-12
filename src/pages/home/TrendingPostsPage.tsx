import React from 'react';
import PostCardGrid, {
  PostCardGridSkeleton,
} from '../../components/common/PostCardGrid';
import useTrendingPosts from './hooks/useTrendingPosts';

export type TrendingPageProps = {};

function TrendingPage(props: TrendingPageProps) {
  const { data, loading } = useTrendingPosts();

  return (
    <PostCardGrid
      posts={data?.trendingPosts || []}
      forHome
      loading={!data || loading}
    />
  );
}

export default TrendingPage;

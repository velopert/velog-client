import React from 'react';
import PostCardGrid, {
  PostCardGridSkeleton,
} from '../../components/common/PostCardGrid';
import useTrendingPosts from './hooks/useTrendingPosts';

export type TrendingPageProps = {};

function TrendingPage(props: TrendingPageProps) {
  const { data, loading, isFinished } = useTrendingPosts();

  console.log(loading);
  if (!data) return <PostCardGridSkeleton />;
  return (
    <>
      <PostCardGrid posts={data.trendingPosts} />
      {data && loading && <PostCardGridSkeleton />}
    </>
  );
}

export default TrendingPage;

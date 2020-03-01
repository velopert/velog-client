import React from 'react';
import useRecentPosts from './hooks/useRecentPosts';
import PostCardGrid, {
  PostCardGridSkeleton,
} from '../../components/common/PostCardGrid';

export type RecentPostsPageProps = {};

function RecentPostsPage(props: RecentPostsPageProps) {
  const { data, loading } = useRecentPosts();

  if (!data) return <PostCardGridSkeleton />;
  return (
    <>
      <PostCardGrid posts={data.posts} />
      {loading && <PostCardGridSkeleton />}
    </>
  );
}

export default RecentPostsPage;

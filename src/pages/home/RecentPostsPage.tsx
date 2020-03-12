import React from 'react';
import useRecentPosts from './hooks/useRecentPosts';
import PostCardGrid, {
  PostCardGridSkeleton,
} from '../../components/common/PostCardGrid';

export type RecentPostsPageProps = {};

function RecentPostsPage(props: RecentPostsPageProps) {
  const { data, loading } = useRecentPosts();

  return (
    <PostCardGrid
      posts={data?.posts || []}
      forHome
      loading={!data || loading}
    />
  );
}

export default RecentPostsPage;

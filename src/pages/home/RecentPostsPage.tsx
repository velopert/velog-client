import React from 'react';
import useRecentPosts from './hooks/useRecentPosts';
import PostCardGrid from '../../components/common/PostCardGrid';

export type RecentPostsPageProps = {};

function RecentPostsPage(props: RecentPostsPageProps) {
  const { data, loading } = useRecentPosts();

  if (!data) return null;
  return <PostCardGrid posts={data.posts} />;
}

export default RecentPostsPage;

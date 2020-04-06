import React from 'react';
import useRecentPosts from './hooks/useRecentPosts';
import PostCardGrid from '../../components/common/PostCardGrid';
import { Helmet } from 'react-helmet-async';

export type RecentPostsPageProps = {};

function RecentPostsPage(props: RecentPostsPageProps) {
  const { data, loading } = useRecentPosts();

  return (
    <>
      <Helmet>
        <title>최신 포스트 - velog</title>
        <meta
          name="description"
          content="벨로그에서 다양한 개발자들이 작성한 따끈따끈한 최신 포스트들을 읽어보세요."
        />
      </Helmet>
      <PostCardGrid
        posts={data?.posts || []}
        forHome
        loading={!data || loading}
      />
    </>
  );
}

export default RecentPostsPage;

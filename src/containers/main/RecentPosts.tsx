import React, { useCallback } from 'react';
import PostCardList, {
  PostCardListSkeleton,
} from '../../components/common/FlatPostCardList';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import useScrollPagination from '../../lib/hooks/useScrollPagination';
import { safe } from '../../lib/utils';
import { Helmet } from 'react-helmet-async';

interface RecentPostsProps {}

const RecentPosts: React.FC<RecentPostsProps> = props => {
  const getPostList = useQuery<{ posts: PartialPost[] }>(GET_POST_LIST, {
    notifyOnNetworkStatusChange: true,
  });

  const { data } = getPostList;
  const onLoadMore = useCallback(
    (cursor: string) => {
      getPostList.fetchMore({
        variables: {
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            posts: [...prev.posts, ...fetchMoreResult.posts],
          };
        },
      });
    },
    [getPostList],
  );

  const cursor = safe(() => data!.posts[data!.posts.length - 1].id);

  useScrollPagination({
    cursor,
    onLoadMore,
  });

  if (!data || !data.posts) return <PostCardListSkeleton />;

  return (
    <>
      <Helmet>
        <title>최신 포스트 - velog</title>
        <meta
          name="description"
          content="벨로그에서 다양한 개발자들이 작성한 따끈따끈한 최신 포스트들을 읽어보세요."
        />
      </Helmet>
      <PostCardList posts={data.posts} />
      {getPostList.loading && <PostCardListSkeleton forLoading />}
    </>
  );
};

export default RecentPosts;

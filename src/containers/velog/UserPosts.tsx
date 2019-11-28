import React, { useCallback } from 'react';
import PostCardList, {
  PostCardListSkeleton,
} from '../../components/common/PostCardList';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import PaginateWithScroll from '../../components/common/PaginateWithScroll';

interface UserPostsProps {
  username: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ username }) => {
  const getPostList = useQuery<{ posts: PartialPost[] }>(GET_POST_LIST, {
    variables: {
      username,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data, error, loading } = getPostList;

  const onLoadMore = useCallback(
    (cursor: string) => {
      getPostList.fetchMore({
        variables: {
          cursor,
          username,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            posts: [...prev.posts, ...fetchMoreResult.posts],
          };
        },
      });
    },
    [getPostList, username],
  );

  if (!data || !data.posts) return <PostCardListSkeleton hideUser={true} />;

  const cursor =
    data.posts.length > 0 ? data.posts[data.posts.length - 1].id : null;

  return (
    <>
      <PostCardList posts={data.posts} hideUser />
      {loading && <PostCardListSkeleton forLoading hideUser={true} />}
      <PaginateWithScroll cursor={cursor} onLoadMore={onLoadMore} />
    </>
  );
};

export default UserPosts;

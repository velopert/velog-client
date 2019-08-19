import React, { useCallback } from 'react';
import PostCardList from '../../components/common/PostCardList';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import PaginateWithScroll from '../../components/common/PaginateWithScroll';

interface UserPostsProps {
  username: string;
}

const UserPosts: React.SFC<UserPostsProps> = ({ username }) => {
  const getPostList = useQuery<{ posts: PartialPost[] }>(GET_POST_LIST, {
    variables: {
      username,
    },
  });

  const { data, error } = getPostList;

  console.log(error);

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

  if (!data || !data.posts) return null;

  const cursor = data.posts[data.posts.length - 1].id;

  return (
    <>
      <PostCardList posts={data.posts} hideUser />
      <PaginateWithScroll cursor={cursor} onLoadMore={onLoadMore} />
    </>
  );
};

export default UserPosts;

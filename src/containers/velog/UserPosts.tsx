import React, { useCallback } from 'react';
import PostCardList, {
  PostCardListSkeleton,
} from '../../components/common/FlatPostCardList';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import PaginateWithScroll from '../../components/common/PaginateWithScroll';
import { undrawBlankCanvas } from '../../static/images';
import { themedPalette } from '../../lib/styles/themes';
import styled from 'styled-components';

interface UserPostsProps {
  username: string;
  tag: string | null;
}

const UserPosts: React.FC<UserPostsProps> = ({ username, tag }) => {
  const getPostList = useQuery<{ posts: PartialPost[] }>(GET_POST_LIST, {
    variables: {
      username,
      tag,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data, loading } = getPostList;

  const onLoadMore = useCallback(
    (cursor: string) => {
      getPostList.fetchMore({
        variables: {
          cursor,
          username,
          tag,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            posts: [...prev.posts, ...fetchMoreResult.posts],
          };
        },
      });
    },
    [getPostList, tag, username],
  );

  if (!data || !data.posts) return <PostCardListSkeleton hideUser={true} />;

  const cursor =
    data.posts.length > 0 ? data.posts[data.posts.length - 1].id : null;

  return (
    <>
      {data.posts.length > 0 ? (
        <PostCardList posts={data.posts} hideUser />
      ) : (
        <EmptyBlock>
          <img src={undrawBlankCanvas} alt="list is empty" />
          <div className="message">포스트가 없습니다.</div>
        </EmptyBlock>
      )}

      {loading && <PostCardListSkeleton forLoading hideUser={true} />}
      <PaginateWithScroll cursor={cursor} onLoadMore={onLoadMore} />
    </>
  );
};

const EmptyBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 6rem;
  margin-bottom: 3rem;
  img {
    width: 20rem;
  }
  .message {
    font-size: 2rem;
    color: ${themedPalette.text3};
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
`;

export default UserPosts;

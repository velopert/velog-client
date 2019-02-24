import * as React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';

const PostCardListBlock = styled.div``;

interface PostCardListProps {}

const PostCardList: React.SFC<PostCardListProps> = props => {
  return (
    <PostCardListBlock>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </PostCardListBlock>
  );
};

export default PostCardList;

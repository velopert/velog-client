import React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';

export type PostCardGridProps = {};

function PostCardGrid(props: PostCardGridProps) {
  return (
    <Block>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
`;

export default PostCardGrid;

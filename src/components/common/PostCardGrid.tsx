import React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import { PartialPost } from '../../lib/graphql/post';

export type PostCardGridProps = {
  posts: PartialPost[];
};

function PostCardGrid({ posts }: PostCardGridProps) {
  return (
    <Block>
      {posts.map(post => (
        <PostCard post={post} key={post.id} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
`;

export default PostCardGrid;

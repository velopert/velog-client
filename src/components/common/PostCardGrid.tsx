import React from 'react';
import styled from 'styled-components';
import PostCard, { PostCardSkeleton } from './PostCard';
import { PartialPost } from '../../lib/graphql/post';
import { mediaQuery } from '../../lib/styles/media';

export type PostCardGridProps = {
  posts: PartialPost[];
  loading?: boolean;
  forHome?: boolean;
};

function PostCardGrid({ posts, loading, forHome }: PostCardGridProps) {
  return (
    <Block>
      {posts.map(post => (
        <PostCard post={post} key={post.id} forHome={forHome} />
      ))}
      {loading &&
        Array.from({ length: 8 }).map((_, i) => (
          <PostCardSkeleton key={i} forHome={forHome} />
        ))}
    </Block>
  );
}

export function PostCardGridSkeleton() {
  return (
    <Block>
      {Array.from({ length: 8 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
  ${mediaQuery(767)} {
    margin: 0;
  }
`;

export default PostCardGrid;

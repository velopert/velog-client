import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostCard, { PostCardSkeleton } from './PostCard';
import { PartialPost } from '../../lib/graphql/post';
import { mediaQuery } from '../../lib/styles/media';
import AdFeed from './AdFeed';

export type PostCardGridProps = {
  posts: PartialPost[];
  loading?: boolean;
  forHome?: boolean;
};

function PostCardGrid({ posts, loading, forHome }: PostCardGridProps) {
  const [adVisible, setAdVisible] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('SHOW_AD') === 'true') {
      setAdVisible(true);
    }
  }, []);

  return (
    <Block>
      {adVisible && <AdFeed />}
      {posts.map((post) => (
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

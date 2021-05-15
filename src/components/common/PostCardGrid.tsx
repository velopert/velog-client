import React, { useState, useEffect, useMemo } from 'react';
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
  // const [adVisible, setAdVisible] = useState(true);
  // useEffect(() => {
  //   if (localStorage.getItem('SHOW_AD') === 'true') {
  //     setAdVisible(true);
  //   }
  // }, []);

  const postsWithAds = useMemo(() => {
    if (!forHome) return posts;
    const cloned: (PartialPost | undefined)[] = [...posts];
    cloned.splice(4, 0, undefined);
    if (cloned.length > 30) {
      cloned.splice(20, 0, undefined);
    }
    return cloned;
  }, [posts, forHome]);

  return (
    <Block>
      {postsWithAds.map((post) => {
        if (post)
          return <PostCard post={post} key={post.id} forHome={forHome} />;
        return <AdFeed />;
      })}
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

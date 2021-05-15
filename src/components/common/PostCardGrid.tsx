import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import PostCard, { PostCardSkeleton } from './PostCard';
import { PartialPost } from '../../lib/graphql/post';
import { mediaQuery } from '../../lib/styles/media';
import AdFeed from './AdFeed';
import { detectAnyAdblocker } from 'just-detect-adblock';
import useUser from '../../lib/hooks/useUser';

export type PostCardGridProps = {
  posts: PartialPost[];
  loading?: boolean;
  forHome?: boolean;
};

function PostCardGrid({ posts, loading, forHome }: PostCardGridProps) {
  const [adBlocked, setAdBlocked] = useState(false);
  const user = useUser();

  useEffect(() => {
    detectAnyAdblocker().then((detected: boolean) => {
      if (detected) {
        setAdBlocked(true);
      }
    });
  }, []);

  const postsWithAds = useMemo(() => {
    if (user) return posts; // hide ads to users
    if (adBlocked) return posts;
    if (!forHome) return posts;
    if (posts.length === 0) return posts;
    const cloned: (PartialPost | undefined)[] = [...posts];
    cloned.splice(4, 0, undefined);
    if (cloned.length > 21) {
      cloned.splice(20, 0, undefined);
    }
    if (cloned.length > 33) {
      cloned.splice(32, 0, undefined);
    }
    if (cloned.length > 49) {
      cloned.splice(48, 0, undefined);
    }
    if (cloned.length > 63) {
      cloned.splice(62, 0, undefined);
    }
    return cloned;
  }, [posts, forHome, adBlocked, user]);

  return (
    <Block>
      {postsWithAds.map((post, i) => {
        if (post)
          return <PostCard post={post} key={post.id} forHome={forHome} />;
        return <AdFeed key={i} />;
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

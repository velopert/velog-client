import React, { useMemo } from 'react';
import styled from 'styled-components';
import SeriesPostItem, { SeriesPostItemSkeleton } from './SeriesPostItem';
import { SeriesPostPreview } from '../../lib/graphql/series';

const SeriesPostListBlock = styled.div`
  margin-top: 4rem;
`;

export interface SeriesPostListProps {
  seriesPosts: SeriesPostPreview[];
  reversed: boolean;
  username: string;
}

const SeriesPostList: React.FC<SeriesPostListProps> = ({
  seriesPosts,
  reversed,
  username,
}) => {
  const ordered = useMemo(() => {
    if (reversed) {
      return [...seriesPosts].reverse();
    }
    return seriesPosts;
  }, [reversed, seriesPosts]);

  return (
    <SeriesPostListBlock>
      {ordered.map((seriesPost, i) => (
        <SeriesPostItem
          date={seriesPost.post.released_at}
          title={seriesPost.post.title}
          description={seriesPost.post.short_description}
          thumbnail={seriesPost.post.thumbnail}
          index={reversed ? seriesPosts.length - i : i + 1}
          urlSlug={seriesPost.post.url_slug}
          key={seriesPost.id}
          username={username}
        />
      ))}
    </SeriesPostListBlock>
  );
};

export function SeriesPostListSkeleton() {
  return (
    <SkeletonBlock>
      {Array.from({ length: 4 }).map((_, index) => (
        <SeriesPostItemSkeleton key={index} />
      ))}
    </SkeletonBlock>
  );
}

const SkeletonBlock = styled(SeriesPostListBlock)`
  margin-top: 7rem;
`;

export default SeriesPostList;

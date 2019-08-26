import React, { useMemo } from 'react';
import styled from 'styled-components';
import SeriesPostItem from './SeriesPostItem';
import { SeriesPostPreview } from '../../lib/graphql/series';

const SeriesPostListBlock = styled.div`
  margin-top: 4rem;
`;

export interface SeriesPostListProps {
  seriesPosts: SeriesPostPreview[];
  reversed: boolean;
}

const SeriesPostList: React.FC<SeriesPostListProps> = ({
  seriesPosts,
  reversed,
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
          key={seriesPost.id}
        />
      ))}
    </SeriesPostListBlock>
  );
};

export default SeriesPostList;

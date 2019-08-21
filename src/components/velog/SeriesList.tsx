import React from 'react';
import styled from 'styled-components';
import SeriesItem from './SeriesItem';
import { PartialSeries } from '../../lib/graphql/user';

const SeriesListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
  margin-top: -3rem;
`;

export interface SeriesListProps {
  list: PartialSeries[];
}

const SeriesList: React.FC<SeriesListProps> = ({ list }) => {
  return (
    <SeriesListBlock>
      {list.map(series => (
        <SeriesItem
          key={series.id}
          name={series.name}
          postsCount={series.posts_count}
          thumbnail={series.thumbnail || ''}
          lastUpdate={series.updated_at}
        />
      ))}
    </SeriesListBlock>
  );
};

export default SeriesList;

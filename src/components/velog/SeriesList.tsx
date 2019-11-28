import React from 'react';
import styled from 'styled-components';
import SeriesItem, { SeriesItemSkeleton } from './SeriesItem';
import { PartialSeries } from '../../lib/graphql/user';
import { undrawBlankCanvas } from '../../static/images';
import palette from '../../lib/styles/palette';

const SeriesListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
  margin-top: -3rem;

  .empty {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 6rem;
    margin-bottom: 3rem;
    img {
      width: 20rem;
    }
    .message {
      font-size: 2rem;
      color: #ced4da;
      margin-top: 3rem;
      margin-bottom: 2rem;
    }
  }
`;

export interface SeriesListProps {
  list: PartialSeries[];
  username: string;
}

const SeriesList: React.FC<SeriesListProps> = ({ list, username }) => {
  return (
    <SeriesListBlock>
      {list.length === 0 && (
        <div className="empty">
          <img src={undrawBlankCanvas} alt="list is empty" />
          <div className="message">시리즈가 없습니다.</div>
        </div>
      )}
      {list.map(series => (
        <SeriesItem
          key={series.id}
          name={series.name}
          postsCount={series.posts_count}
          thumbnail={series.thumbnail || ''}
          lastUpdate={series.updated_at}
          username={username}
          urlSlug={series.url_slug}
        />
      ))}
    </SeriesListBlock>
  );
};

export function SeriesListSkeleton() {
  return (
    <SeriesListBlock>
      <SeriesItemSkeleton />
      <SeriesItemSkeleton />
      <SeriesItemSkeleton />
      <SeriesItemSkeleton />
    </SeriesListBlock>
  );
}

export default SeriesList;

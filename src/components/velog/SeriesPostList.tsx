import React from 'react';
import styled from 'styled-components';
import SeriesPostItem from './SeriesPostItem';

const SeriesPostListBlock = styled.div`
  margin-top: 4rem;
`;

export interface SeriesPostListProps {}

const SeriesPostList: React.FC<SeriesPostListProps> = props => {
  return (
    <SeriesPostListBlock>
      <SeriesPostItem />
      <SeriesPostItem />
      <SeriesPostItem />
      <SeriesPostItem />
      <SeriesPostItem />
      <SeriesPostItem />
      <SeriesPostItem />
      <SeriesPostItem />
    </SeriesPostListBlock>
  );
};

export default SeriesPostList;

import React from 'react';
import styled from 'styled-components';

const SeriesItemBlock = styled.div`
  img {
    width: 368px;
    height: 193px;
  }
`;

export interface SeriesItemProps {
  thumbnail: string;
  name: string;
  postsCount: number;
  lastUpdate: string;
}

const SeriesItem: React.FC<SeriesItemProps> = props => {
  return <SeriesItemBlock />;
};

export default SeriesItem;

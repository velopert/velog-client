import React from 'react';
import styled from 'styled-components';

const SeriesSorterAlignerBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2.25rem;
`;

export interface SeriesSorterAlignerProps {}

const SeriesSorterAligner: React.FC<SeriesSorterAlignerProps> = ({
  children,
}) => {
  return <SeriesSorterAlignerBlock>{children}</SeriesSorterAlignerBlock>;
};

export default SeriesSorterAligner;

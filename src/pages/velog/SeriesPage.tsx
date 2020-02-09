import React, { useEffect } from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
import SeriesPosts from '../../containers/velog/SeriesPosts';
import { RouteComponentProps } from 'react-router';
import media from '../../lib/styles/media';

const SeriesPageBlock = styled(VelogResponsive)`
  margin-top: 90px;
  ${media.medium} {
    margin-top: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export interface SeriesPageProps
  extends RouteComponentProps<{
    username: string;
    urlSlug: string;
  }> {}

const SeriesPage: React.FC<SeriesPageProps> = ({ match }) => {
  const { username, urlSlug } = match.params;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <SeriesPageBlock>
      <SeriesPosts username={username} urlSlug={urlSlug} />
    </SeriesPageBlock>
  );
};

export default SeriesPage;

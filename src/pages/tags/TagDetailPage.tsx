import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import TagDetailContainer from '../../containers/tags/TagDetailContainer';
import media from '../../lib/styles/media';

export type TagDetailPageProps = {} & RouteComponentProps<{ tag: string }>;

function TagDetailPage({ match }: TagDetailPageProps) {
  const { tag } = match.params;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tag]);
  return (
    <Block>
      <TagDetailContainer tag={tag} />
    </Block>
  );
}

const Block = styled.div`
  width: 702px;
  margin: 0 auto;
  ${media.small} {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default TagDetailPage;

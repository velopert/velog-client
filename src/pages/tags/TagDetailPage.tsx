import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import TagDetailContainer from '../../containers/tags/TagDetailContainer';

export type TagDetailPageProps = {} & RouteComponentProps<{ tag: string }>;

function TagDetailPage({ match }: TagDetailPageProps) {
  const { tag } = match.params;
  return (
    <Block>
      <TagDetailContainer tag={tag} />
    </Block>
  );
}

const Block = styled.div`
  width: 702px;
  margin: 0 auto;
`;

export default TagDetailPage;

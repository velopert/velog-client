import React from 'react';
import styled from 'styled-components';
import DetailedTagItem from './DetailedTagItem';
import { Tag } from '../../lib/graphql/tags';

export type DetailedTagListProps = {
  tags: Tag[];
};

function DetailedTagList({ tags }: DetailedTagListProps) {
  return (
    <Block>
      {tags.map(tag => (
        <DetailedTagItem
          name={tag.name}
          key={tag.id}
          description={tag.description}
          postsCount={tag.posts_count}
        />
      ))}
    </Block>
  );
}

const Block = styled.section`
  margin: 0 auto;
  margin-top: 4rem;
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
`;

export default React.memo(DetailedTagList);

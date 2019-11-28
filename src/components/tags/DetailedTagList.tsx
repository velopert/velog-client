import React from 'react';
import styled, { css } from 'styled-components';
import DetailedTagItem, { DetailedTagItemSkeleton } from './DetailedTagItem';
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

type DetailedTagListSkeletonProps = {
  forLoading?: boolean;
};
export function DetailedTagListSkeleton({
  forLoading,
}: DetailedTagListSkeletonProps) {
  return (
    <SkeletonBlock forLoading={forLoading}>
      {Array.from({ length: 20 }).map((_, index) => (
        <DetailedTagItemSkeleton key={index} />
      ))}
    </SkeletonBlock>
  );
}

const Block = styled.section`
  margin: 0 auto;
  margin-top: 4rem;
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
`;

const SkeletonBlock = styled(Block)<{
  forLoading?: boolean;
}>`
  ${props =>
    props.forLoading &&
    css`
      margin-top: 0;
    `}
`;

export default React.memo(DetailedTagList);

import React from 'react';
import styled, { css } from 'styled-components';
import TagItem from '../common/TagItem';
import palette from '../../lib/styles/palette';

export type DetailedTagItemProps = {
  name: string;
  description: string | null;
  postsCount: number;
};

function DetailedTagItem({
  name,
  description,
  postsCount,
}: DetailedTagItemProps) {
  return (
    <Block hasDescription={!!description}>
      <div>
        <TagItem name={name} link />
        {description && <p>{description}</p>}
      </div>
      <div className="count">총 {postsCount}개의 포스트</div>
    </Block>
  );
}

const Block = styled.div<{ hasDescription: boolean }>`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  width: 25%;
  ${props =>
    props.hasDescription &&
    css`
      height: 12rem;
    `}

  p {
    margin-top: 0.125rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    font-size: 0.875rem;
    color: ${palette.gray7};
  }

  .count {
    font-size: 0.875rem;
    color: ${palette.gray5};
  }
`;

export default React.memo(DetailedTagItem);

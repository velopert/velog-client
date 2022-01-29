import React from 'react';
import styled, { css } from 'styled-components';
import TagItem from '../common/TagItem';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import Skeleton from '../common/Skeleton';
import SkeletonTexts from '../common/SkeletonTexts';
import media from '../../lib/styles/media';

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

export function DetailedTagItemSkeleton() {
  return (
    <SkeletonBlock hasDescription>
      <div>
        <div className="tag-skeleton">
          <Skeleton width="6rem" height="2rem" borderRadius="1rem" />
        </div>
        <div>
          <div className="lines">
            <div className="line">
              <SkeletonTexts wordLengths={[3, 5, 2, 4, 5]} useFlex />
            </div>
            <div className="line">
              <SkeletonTexts wordLengths={[2, 4, 3, 5, 4]} useFlex />
            </div>
          </div>
        </div>
      </div>
      <div className="count">
        <Skeleton width="8rem" />
      </div>
    </SkeletonBlock>
  );
}

const Block = styled.div<{ hasDescription: boolean }>`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  width: 25%;
  ${media.large} {
    width: 33.333%;
  }
  ${media.medium} {
    width: 50%;
    margin-bottom: 1rem;
  }
  ${media.custom(470)} {
    width: 100%;
    margin-bottom: 0;
  }
  ${(props) =>
    props.hasDescription &&
    css`
      height: 12rem;
      ${media.medium} {
        height: auto;
      }
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
    line-height: 1.5;
    ${media.small} {
      font-size: 0.75rem;
    }
  }

  .count {
    font-size: 0.875rem;
    color: ${palette.gray5};
    ${media.medium} {
      margin-top: 0.5rem;
    }
    ${media.small} {
      font-size: 0.75rem;
    }
  }
`;

const SkeletonBlock = styled(Block)`
  .tag-skeleton {
    margin-bottom: 1rem;
  }
  .lines {
    margin-top: 0.125rem;
    .line {
      width: 100%;
      height: 1.3125rem;
      font-size: 0.875rem;
      align-items: center;
      display: flex;
    }
  }
`;

export default React.memo(DetailedTagItem);

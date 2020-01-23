import React from 'react';
import styled from 'styled-components';
import VelogResponsive from './VelogResponsive';
import MarkdownRender from '../common/MarkdownRender';
import palette from '../../lib/styles/palette';
import { undrawEmpty } from '../../static/images';
import Button from '../common/Button';
import SkeletonTexts from '../common/SkeletonTexts';

const VelogAboutContentBlock = styled(VelogResponsive)``;

const EmptyAbout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 20rem;
    height: 20rem;
    margin-bottom: 2rem;
    display: block;
  }
  .message {
    font-size: 2rem;
    color: ${palette.gray6};
    margin-bottom: 2rem;
  }
`;

export interface VelogAboutContentProps {
  markdown: string;
  own: boolean;
  onClickWrite: () => void;
}

const VelogAboutContent = ({
  markdown,
  own,
  onClickWrite,
}: VelogAboutContentProps) => {
  return (
    <VelogAboutContentBlock>
      {markdown ? (
        <MarkdownRender markdown={markdown} />
      ) : (
        <EmptyAbout>
          <img src={undrawEmpty} alt="empty about" />
          <div className="message">소개가 작성되지 않았습니다.</div>
          {own && (
            <Button size="large" onClick={onClickWrite}>
              소개 글 작성하기
            </Button>
          )}
        </EmptyAbout>
      )}
    </VelogAboutContentBlock>
  );
};

export function VelogAboutContentSkeleton() {
  const skeletonParagraph = (
    <div className="lines">
      <div className="line">
        <SkeletonTexts wordLengths={[4, 6, 3, 2, 9, 3, 3, 5, 7, 6]} useFlex />
      </div>
      <div className="line">
        <SkeletonTexts wordLengths={[1, 2, 3, 4, 4, 2, 8, 4, 7, 6]} useFlex />
      </div>
      <div className="line">
        <SkeletonTexts wordLengths={[1, 6, 6, 2, 9, 3, 4, 2, 7, 4]} useFlex />
      </div>
      <div className="line">
        <SkeletonTexts wordLengths={[3, 6, 5, 5, 9]} />
      </div>
    </div>
  );

  return (
    <SkeletonBlock>
      <h1>
        <SkeletonTexts wordLengths={[4, 3, 5, 4, 4, 6]} />
      </h1>
      {skeletonParagraph}
      {skeletonParagraph}
      {skeletonParagraph}
    </SkeletonBlock>
  );
}

const SkeletonBlock = styled(VelogAboutContentBlock)`
  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  .lines {
    width: 100%;
    .line {
      margin-bottom: 0.75rem;
      display: flex;
      font-size: 1.125rem;
    }
  }

  .lines + .lines {
    margin-top: 3rem;
  }
`;

export default VelogAboutContent;

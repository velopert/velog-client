import React from 'react';
import styled from 'styled-components';
import VelogResponsive from './VelogResponsive';
import MarkdownRender from '../common/MarkdownRender';
import palette from '../../lib/styles/palette';
import { undrawEmpty } from '../../static/images';
import Button from '../common/Button';

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
    color: ${palette.gray4};
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

export default VelogAboutContent;

import * as React from 'react';
import styled from 'styled-components';
import MarkdownRender from '../common/MarkdownRender';
import palette from '../../lib/styles/palette';

const MarkdownPreviewBlock = styled.div`
  word-break: break-word;
  &::-webkit-scrollbar {
    border-radius: 3px;
    width: 6px;
    &:hover {
      width: 16px;
    }
    background: ${palette.gray1};
  }

  &::-webkit-scrollbar-thumb {
    background: ${palette.gray9};
    /* -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75); */
  }

  padding: 3rem;
  flex: 1;
  overflow-y: auto;
  color: ${palette.gray9};
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 4rem;
  font-weight: 800;
`;

export interface MarkdownPreviewProps {
  markdown: string;
  title: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  markdown,
  title,
}) => {
  return (
    <MarkdownPreviewBlock>
      <Title>{title}</Title>
      <MarkdownRender markdown={markdown} />
    </MarkdownPreviewBlock>
  );
};

export default MarkdownPreview;

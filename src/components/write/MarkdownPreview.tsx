import * as React from 'react';
import styled from 'styled-components';
import MarkdownRender from '../common/MarkdownRender';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';

const MarkdownPreviewBlock = styled.div`
  word-break: break-word;
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
  className?: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  markdown,
  title,
  className,
}) => {
  return (
    <MarkdownPreviewBlock id="preview">
      <Title>{title}</Title>
      <MarkdownRender markdown={markdown} editing />
    </MarkdownPreviewBlock>
  );
};

export default MarkdownPreview;

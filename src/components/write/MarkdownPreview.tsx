import * as React from 'react';
import styled from 'styled-components';
import MarkdownRender from '../common/MarkdownRender';
import { themedPalette } from '../../lib/styles/themes';

const MarkdownPreviewBlock = styled.div`
  word-break: break-word;
  padding: 3rem;
  flex: 1;
  overflow-y: auto;
  color: ${themedPalette.text1};

  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${themedPalette.bg_element4};
    border-radius: 1px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${themedPalette.bg_element5};
    border-radius: 1px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${themedPalette.bg_element6};
  }
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

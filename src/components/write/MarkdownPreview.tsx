import * as React from 'react';
import styled from 'styled-components';
import MarkdownRender from '../common/MarkdownRender';
import palette from '../../lib/styles/palette';

const MarkdownPreviewBlock = styled.div`
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
`;

interface MarkdownPreviewProps {
  markdown: string;
}

const MarkdownPreview: React.SFC<MarkdownPreviewProps> = ({ markdown }) => {
  return (
    <MarkdownPreviewBlock>
      <MarkdownRender markdown={markdown} />
    </MarkdownPreviewBlock>
  );
};

export default MarkdownPreview;

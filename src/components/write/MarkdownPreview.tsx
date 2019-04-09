import * as React from 'react';
import styled from 'styled-components';
import MarkdownRender from '../common/MarkdownRender';

const MarkdownPreviewBlock = styled.div`
  padding: 3rem;
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

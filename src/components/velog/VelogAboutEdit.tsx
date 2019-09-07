import React from 'react';
import styled from 'styled-components';
import MarkdownEditor from '../common/MarkdownEditor';

const VelogAboutEditBlock = styled.div``;

export interface VelogAboutEditProps {
  onChangeMarkdown: (markdown: string) => void;
  initialMarkdown: string;
}

const VelogAboutEdit = ({
  onChangeMarkdown,
  initialMarkdown,
}: VelogAboutEditProps) => {
  return (
    <VelogAboutEditBlock>
      <MarkdownEditor
        onChangeMarkdown={onChangeMarkdown}
        initialMarkdown={initialMarkdown}
      />
    </VelogAboutEditBlock>
  );
};

export default VelogAboutEdit;

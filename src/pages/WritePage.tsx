import React, { FC } from 'react';
import styled from 'styled-components';
import EditorPanes from '../components/write/EditorPanes';
import MarkdownEditorContainer from '../containers/write/MarkdownEditorContainer';
import MarkdownPreviewContainer from '../containers/write/MarkdownPreviewContainer';

const WritePageBlock = styled.div`
  width: 100%;
  height: 100%;
`;

const WritePage: FC = () => {
  return (
    <WritePageBlock>
      {/* <FullPageEditor /> */}
      <EditorPanes
        left={<MarkdownEditorContainer />}
        right={<MarkdownPreviewContainer />}
      />
    </WritePageBlock>
  );
};

export default WritePage;

import * as React from 'react';
import styled from 'styled-components';
import QuillEditor from '../components/write/QuillEditor';
import EditorPanes from '../components/write/EditorPanes';

import MarkdownEditorContainer from '../containers/write/MarkdownEditorContainer';
import MarkdownPreviewContainer from '../containers/write/MarkdownPreviewContainer';

const WritePageBlock = styled.div`
  width: 100%;
  height: 100%;
`;

interface WritePageProps {}

const WritePage: React.SFC<WritePageProps> = props => {
  return (
    <WritePageBlock>
      <QuillEditor />
      {/* <EditorPanes
        left={<MarkdownEditorContainer />}
        right={<MarkdownPreviewContainer />}
      /> */}
    </WritePageBlock>
  );
};

export default WritePage;

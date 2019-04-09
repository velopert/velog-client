import React, { FC } from 'react';
import styled from 'styled-components';
import EditorPanes from '../components/write/EditorPanes';
import MarkdownEditor from '../components/write/MarkdownEditor';

const WritePageBlock = styled.div`
  width: 100%;
  height: 100%;
`;

interface WritePageProps {}

const WritePage: FC<WritePageProps> = props => {
  return (
    <WritePageBlock>
      {/* <FullPageEditor /> */}
      <EditorPanes left={<MarkdownEditor />} right="bye" />
    </WritePageBlock>
  );
};

export default WritePage;

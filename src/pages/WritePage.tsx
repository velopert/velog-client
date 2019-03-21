import * as React from 'react';
import styled from 'styled-components';
import FullPageEditor from '../components/write/FullPageEditor';

const WritePageBlock = styled.div`
  width: 100%;
  height: 100%;
`;

interface WritePageProps {}

const WritePage: React.SFC<WritePageProps> = props => {
  return (
    <WritePageBlock>
      <FullPageEditor />
    </WritePageBlock>
  );
};

export default WritePage;

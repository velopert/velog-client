import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const EditorPanesBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const EditorPane = styled.div`
  min-width: 0;
  flex: 1;
`;

export interface EditorPanesProps {
  theme?: 'LIGHT' | 'DARK';
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const EditorPanes: React.SFC<EditorPanesProps> = ({
  theme = 'LIGHT',
  left,
  right,
}) => {
  return (
    <EditorPanesBlock>
      <EditorPane
        data-testid="left"
        style={{
          backgroundColor: theme === 'DARK' ? '#263238' : 'white',
        }}
      >
        {left}
      </EditorPane>
      <EditorPane
        data-testid="right"
        style={{
          backgroundColor: theme === 'DARK' ? 'white' : palette.gray0,
        }}
      >
        {right}
      </EditorPane>
    </EditorPanesBlock>
  );
};

export default EditorPanes;

import * as React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const EditorPanesBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const EditorPane = styled.div<{ shadow?: boolean }>`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  ${props =>
    props.shadow &&
    css`
      z-index: 1;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.015);
    `}
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
        shadow
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
          backgroundColor: theme === 'DARK' ? 'white' : '#fbfdfc',
        }}
      >
        {right}
      </EditorPane>
    </EditorPanesBlock>
  );
};

export default EditorPanes;

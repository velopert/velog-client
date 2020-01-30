import * as React from 'react';
import styled, { css } from 'styled-components';

import transitions from '../../lib/styles/transitions';
import media from '../../lib/styles/media';
const EditorPanesBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  animation: ${transitions.fadeIn} 0.5s forwards;
`;
const EditorPane = styled.div<{ shadow?: boolean }>`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  ${props =>
    props.shadow &&
    css`
      z-index: 1;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.015);
    `}
`;

const RightPane = styled(EditorPane)`
  ${media.medium} {
    display: none;
  }
`;

export interface EditorPanesProps {
  theme?: 'LIGHT' | 'DARK';
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const EditorPanes: React.FC<EditorPanesProps> = ({
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
      <RightPane
        data-testid="right"
        style={{
          backgroundColor: theme === 'DARK' ? 'white' : '#fbfdfc',
        }}
      >
        {right}
      </RightPane>
    </EditorPanesBlock>
  );
};

export default EditorPanes;

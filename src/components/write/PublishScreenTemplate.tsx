import * as React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import zIndexes from '../../lib/styles/zIndexes';
import transitions from '../../lib/styles/transitions';
import HideScroll from '../common/HideScroll';

const PublishScreenTemplateBlock = styled.div<{ visible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${palette.gray0};
  z-index: ${zIndexes.PublishScreen};
  animation: ${transitions.slideUp} 0.25s forwards ease-in;
  ${props =>
    props.visible
      ? css`
          animation: ${transitions.slideUp} 0.25s forwards ease-in;
        `
      : css`
          animation: ${transitions.slideDown} 0.125s forwards ease-out;
        `}
`;

const Wrapper = styled.div`
  width: 768px;
  display: flex;
`;
const Pane = styled.div`
  flex: 1;
  min-width: 0;
`;
const RightPane = styled(Pane)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Separator = styled.div`
  width: 1px;
  min-height: 425px;
  background: ${palette.gray2};
  margin-left: 2rem;
  margin-right: 2rem;
`;

export interface PublishScreenTemplateProps {
  visible: boolean;
  left: React.ReactNode;
  right: React.ReactNode;
}

const { useState, useEffect } = React;
const PublishScreenTemplate: React.FC<PublishScreenTemplateProps> = ({
  visible,
  left,
  right,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timeoutId: null | number = null;
    if (visible) {
      setAnimate(true);
    } else if (!visible && animate) {
      timeoutId = setTimeout(() => {
        setAnimate(false);
      }, 125);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible, animate]);

  if (!visible && !animate) return null;
  return (
    <PublishScreenTemplateBlock visible={visible}>
      <Wrapper>
        <Pane>{left}</Pane>
        <Separator />
        <RightPane>{right}</RightPane>
      </Wrapper>
      <HideScroll />
    </PublishScreenTemplateBlock>
  );
};

export default PublishScreenTemplate;

import * as React from 'react';
import styled, { css } from 'styled-components';
import OpaqueLayer from './OpaqueLayer';
import zIndexes from '../../lib/styles/zIndexes';
import transitions from '../../lib/styles/transitions';
import media from '../../lib/styles/media';
import { themedPalette } from '../../lib/styles/themes';

const PopupBaseBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndexes.Popup};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupWrapper = styled.div<{ visible: boolean }>`
  width: 25rem;
  border-radius: 4px;
  background: ${themedPalette.bg_element1};
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
  ${media.small} {
    width: calc(100% - 2rem);
  }
  ${(props) =>
    props.visible
      ? css`
          animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
        `
      : css`
          animation: ${transitions.popOutToBottom} 0.2s forwards ease-in-out;
        `}
`;

interface PopupBaseProps {
  visible: boolean;
}

const { useState, useEffect } = React;

const PopupBase: React.FC<PopupBaseProps> = ({ visible, children }) => {
  const [closed, setClosed] = useState(true);
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (visible) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!visible && closed) return null;

  return (
    <>
      <OpaqueLayer visible={visible} />
      <PopupBaseBlock>
        <PopupWrapper visible={visible}>{children}</PopupWrapper>
      </PopupBaseBlock>
    </>
  );
};

export default PopupBase;

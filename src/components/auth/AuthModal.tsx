import * as React from 'react';
import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';
import zIndexes from '../../lib/styles/zIndexes';
import palette from '../../lib/styles/palette';
import { undrawJoyride } from '../../static/images';
import transitions from '../../lib/styles/transitions';
import media from '../../lib/styles/media';

const { useState, useEffect } = React;

const AuthModalBlock = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndexes.AuthModal};
  .wrapper {
    width: 606px;
    height: 480px;
    ${media.small} {
      flex: 1;
      width: auto;
      height: 100%;
    }

    ${props =>
      props.visible
        ? css`
            animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
          `
        : css`
            animation: ${transitions.popOutToBottom} 0.2s forwards ease-in-out;
          `}

    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
    display: flex;
    .gray-block {
      ${media.small} {
        display: none;
      }
      width: 216px;
      background: ${palette.gray1};
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
      .welcome {
        font-size: 1.75rem;
        margin-top: 1.5rem;
        color: ${palette.gray7};
        text-align: center;
        font-weight: 600;
      }
    }
    .white-block {
      flex: 1;
      background: white;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      ${media.small} {
        overflow-y: auto;
      }
      .exit-wrapper {
        display: flex;
        justify-content: flex-end;
        font-size: 1.5rem;
        color: ${palette.gray6};
        margin-bottom: 2.25rem;
        svg {
          cursor: pointer;
        }
        ${media.small} {
          margin-bottom: 0;
        }
      }
      .block-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  children,
  onClose,
}) => {
  const [closed, setClosed] = useState(true);
  useEffect(() => {
    let timeoutId: number | null = null;
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
    <AuthModalBlock visible={visible}>
      <div className="wrapper">
        <div className="gray-block">
          <div>
            <img src={undrawJoyride} alt="welcome" />
            <div className="welcome">환영합니다!</div>
          </div>
        </div>
        <div className="white-block">
          <div className="exit-wrapper">
            <MdClose onClick={onClose} tabIndex={1} />
          </div>
          <div className="block-content">{children}</div>
        </div>
      </div>
    </AuthModalBlock>
  );
};

export default AuthModal;

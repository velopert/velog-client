import * as React from 'react';
import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';
import zIndexes from '../../lib/styles/zIndexes';
import palette from '../../lib/styles/palette';
import { plutoWelcome } from '../../static/images';
import transitions from '../../lib/styles/transitions';
import useMounted from '../../lib/hooks/useMounted';

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
        font-size: 2.25rem;
        font-weight: bold;
        margin-top: 1.5rem;
        color: ${palette.gray7};
        text-align: center;
      }
    }
    .white-block {
      flex: 1;
      background: white;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      .exit-wrapper {
        display: flex;
        justify-content: flex-end;
        font-size: 1.5rem;
        color: ${palette.gray6};
        margin-bottom: 2.25rem;
        svg {
          cursor: pointer;
        }
      }
      .block-content {
        flex: 1;
      }
    }
  }
`;

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.SFC<AuthModalProps> = ({
  visible,
  children,
  onClose,
}) => {
  const [closed, setClosed] = useState(true);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
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
            <img src={plutoWelcome} alt="pluto-welcome" />
            <div className="welcome">환영합니다!</div>
          </div>
        </div>
        <div className="white-block">
          <div className="exit-wrapper">
            <MdClose onClick={onClose} />
          </div>
          <div className="block-content">{children}</div>
        </div>
      </div>
    </AuthModalBlock>
  );
};

export default AuthModal;

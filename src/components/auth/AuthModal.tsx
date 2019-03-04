import * as React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import zIndexes from '../../lib/styles/zIndexes';
import palette from '../../lib/styles/palette';
import { plutoWelcome } from '../../static/images';

const AuthModalBlock = styled.div`
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
      .exit-wrapper {
        display: flex;
        justify-content: flex-end;
        font-size: 1.5rem;
        color: ${palette.gray6};
        svg {
          cursor: pointer;
        }
      }
    }
  }
`;

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.SFC<AuthModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <AuthModalBlock>
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
        </div>
      </div>
    </AuthModalBlock>
  );
};

export default AuthModal;

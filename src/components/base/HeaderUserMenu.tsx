import * as React from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import HeaderUserMenuItem from './HeaderUserMenuItem';

const HeaderUserMenuBlock = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 1rem;
  right: 0;
  > .menu-wrapper {
    position: relative;
    z-index: 5;
    width: 12rem;
    background: white;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  }
`;

interface HeaderUserMenuProps {
  onClose: () => void;
  onLogout: () => void;
  username: string;
  visible: boolean;
}

const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({
  onClose,
  onLogout,
  username,
  visible,
}) => {
  if (!visible) return null;
  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <HeaderUserMenuBlock>
        <div className="menu-wrapper">
          <HeaderUserMenuItem to={`/@${username}`}>
            내 벨로그
          </HeaderUserMenuItem>
          <HeaderUserMenuItem to="/saves">임시 글</HeaderUserMenuItem>
          <HeaderUserMenuItem to="/setting">설정</HeaderUserMenuItem>
          <HeaderUserMenuItem onClick={onLogout}>로그아웃</HeaderUserMenuItem>
        </div>
      </HeaderUserMenuBlock>
    </OutsideClickHandler>
  );
};

export default HeaderUserMenu;

import React from 'react';
import styled, { css } from 'styled-components';
import { Logo } from '../../static/svg';
import Button from '../common/Button';
import { breakpoints } from '../../lib/styles/responsive';
import RoundButton from '../common/RoundButton';
import { CurrentUser } from '../../lib/graphql/user';
import HeaderUserIcon from './HeaderUserIcon';
import useToggle from '../../lib/hooks/useToggle';
import HeaderUserMenu from './HeaderUserMenu';
import { logout } from '../../lib/api/auth';
import storage from '../../lib/storage';

const HeaderBlock = styled.div<{
  floating: boolean;
}>`
  width: 100%;
  > .wrapper {
    width: ${breakpoints.xlarge};
    height: 6rem;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logged-in {
      position: relative;
      display: flex;
      align-items: center;
    }
  }

  ${props =>
    props.floating &&
    css`
      position: fixed;
      top: 0;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0px 0 8px rgba(0, 0, 0, 0.08);
    `}
`;

const Placeholder = styled.div`
  width: 100%;
  height: 4rem;
`;

interface HeaderProps {
  floating: boolean;
  floatingMargin: number;
  onLoginClick: () => void;
  user: CurrentUser | null;
}

const { useState, useCallback } = React;

const Header: React.SFC<HeaderProps> = ({
  floating,
  floatingMargin,
  onLoginClick,
  user,
}) => {
  const [userMenu, toggleUserMenu] = useToggle(false);

  const onLogout = useCallback(async () => {
    try {
      await logout();
    } catch {}
    storage.removeItem('CURRENT_USER');
    window.location.href = '/';
  }, []);
  return (
    <>
      <HeaderBlock
        floating={floating}
        style={{ marginTop: floating ? floatingMargin : 0 }}
      >
        <div className="wrapper">
          <div className="brand">
            <Logo />
          </div>
          <div className="right">
            {user ? (
              <div className="logged-in">
                <RoundButton
                  border
                  color="darkGray"
                  style={{ marginRight: '1.25rem' }}
                  to="/write"
                >
                  새 글 작성
                </RoundButton>
                <HeaderUserIcon user={user} onClick={toggleUserMenu} />
                <HeaderUserMenu
                  onClose={toggleUserMenu}
                  username={user.username}
                  onLogout={onLogout}
                  visible={userMenu}
                />
              </div>
            ) : (
              <RoundButton color="darkGray" onClick={onLoginClick}>
                로그인
              </RoundButton>
            )}
          </div>
        </div>
      </HeaderBlock>
      {floating && <Placeholder />}
    </>
  );
};

export default Header;

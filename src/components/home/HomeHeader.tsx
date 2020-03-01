import React from 'react';
import styled from 'styled-components';
import { Logo } from '../../static/svg';
import RoundButton from '../common/RoundButton';
import HomeResponsive from './HomeResponsive';
import useHeader from './hooks/useHeader';
import HeaderUserIcon from '../base/HeaderUserIcon';
import useToggle from '../../lib/hooks/useToggle';
import HeaderUserMenu from '../base/HeaderUserMenu';

export type HomeHeaderProps = {};

function HomeHeader(props: HomeHeaderProps) {
  const { user, onLoginClick, onLogout } = useHeader();
  const [userMenu, toggleUserMenu] = useToggle(false);

  return (
    <Block>
      <Inner>
        <Logo />
        {user ? (
          <Right>
            <HeaderUserIcon user={user} onClick={toggleUserMenu} />
            <HeaderUserMenu
              onClose={toggleUserMenu}
              onLogout={onLogout}
              username={user.username}
              visible={userMenu}
            />
          </Right>
        ) : (
          <Right>
            <RoundButton color="darkGray" onClick={onLoginClick}>
              로그인
            </RoundButton>
          </Right>
        )}
      </Inner>
    </Block>
  );
}

const Block = styled.div`
  height: 4rem;
`;

const Inner = styled(HomeResponsive)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export default HomeHeader;

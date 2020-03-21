import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Logo, SearchIcon2 } from '../../static/svg';
import RoundButton from '../common/RoundButton';
import MainResponsive from './MainResponsive';
import useHeader from '../home/hooks/useHeader';
import HeaderUserIcon from '../base/HeaderUserIcon';
import useToggle from '../../lib/hooks/useToggle';
import HeaderUserMenu from '../base/HeaderUserMenu';
import { Link } from 'react-router-dom';
import media, { mediaQuery } from '../../lib/styles/media';

export type MainHeaderProps = {};

function MainHeader(props: MainHeaderProps) {
  const { user, onLoginClick, onLogout } = useHeader();
  const [userMenu, toggleUserMenu] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);

  const onOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as any)) return;
      toggleUserMenu();
    },
    [toggleUserMenu],
  );

  return (
    <Block>
      <Inner>
        <StyledLink to="/">
          <Logo />
        </StyledLink>
        {user ? (
          <Right>
            <SearchButton to="/search">
              <SearchIcon2 />
            </SearchButton>
            <RoundButton
              border
              color="darkGray"
              style={{ marginRight: '1.25rem' }}
              to="/write"
              className="write-button"
            >
              새 글 작성
            </RoundButton>

            <div ref={ref}>
              <HeaderUserIcon user={user} onClick={toggleUserMenu} />
            </div>
            <HeaderUserMenu
              onClose={onOutsideClick}
              onLogout={onLogout}
              username={user.username}
              visible={userMenu}
            />
          </Right>
        ) : (
          <Right>
            <SearchButton to="/search">
              <SearchIcon2 />
            </SearchButton>
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

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const SearchButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.045);
  }
  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
  margin-right: 0.75rem;
`;

const Inner = styled(MainResponsive)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  .write-button {
    ${media.medium} {
      display: none;
    }
  }
`;

export default MainHeader;

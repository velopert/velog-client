import React, { useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';
import RoundButton from '../common/RoundButton';
import { CurrentUser } from '../../lib/graphql/user';
import HeaderUserIcon from './HeaderUserIcon';
import useToggle from '../../lib/hooks/useToggle';
import HeaderUserMenu from './HeaderUserMenu';
import { logout } from '../../lib/api/auth';
import storage from '../../lib/storage';
import { UserLogo } from '../../modules/header';
import HeaderLogo from './HeaderLogo';
import media from '../../lib/styles/media';
import { SearchIcon2 } from '../../static/svg';
import { Link } from 'react-router-dom';
import MainResponsive from '../main/MainResponsive';

const HeaderBlock = styled.div<{ floating: boolean }>`
  width: 100%;
  .wrapper {
    /* width: 1200px; */
    width: 100%;
    height: 4rem;
    /* padding-left: 1rem;
    padding-right: 1rem; */
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search {
      display: none;
      margin-right: 1rem;
    }

    .right {
      display: flex;
      align-items: center;
    }

    ${media.large} {
      /* width: 1024px; */
    }
    ${media.medium} {
      /* width: 100%; */
      .write-button {
        display: none;
      }
      .search {
        display: block;
      }
    }
    ${media.small} {
      height: 3.5rem;

      .login-button {
        font-size: 0.875rem;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
      }
    }

    .logged-in {
      position: relative;
      display: flex;
      align-items: center;
    }
  }

  ${props =>
    props.floating &&
    css`
      z-index: 10;
      position: fixed;
      top: 0;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0 8px rgba(0, 0, 0, 0.08);
    `}
`;

const Placeholder = styled.div`
  width: 100%;
  height: 5rem;
  ${media.small} {
    height: 3.5rem;
  }
`;

interface HeaderProps {
  floating: boolean;
  floatingMargin: number;
  onLoginClick: () => void;
  user: CurrentUser | null;
  custom: boolean;
  userLogo: UserLogo | null;
  velogUsername: string | null;
  isSearch: boolean;
}

const Header: React.FC<HeaderProps> = ({
  floating,
  floatingMargin,
  onLoginClick,
  user,
  custom,
  userLogo,
  velogUsername,
  isSearch,
}) => {
  const [userMenu, toggleUserMenu] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);

  const onLogout = useCallback(async () => {
    try {
      await logout();
    } catch {}
    storage.removeItem('CURRENT_USER');
    window.location.href = '/';
  }, []);

  const onOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as any)) return;
      toggleUserMenu();
    },
    [toggleUserMenu],
  );

  return (
    <>
      <HeaderBlock
        floating={floating}
        style={{ marginTop: floating ? floatingMargin : 0 }}
        data-testid="Header"
      >
        <MainResponsive>
          <div className="wrapper">
            <div className="brand">
              <HeaderLogo
                custom={custom}
                userLogo={userLogo}
                velogUsername={velogUsername}
              />
            </div>
            <div className="right">
              {/* {velogUsername ? (
              <SearchIcon2 className="search" />
            ) : (
              <Link to="/search">
                <SearchIcon2 className="search" />
              </Link>
            )} */}
              {!isSearch && (
                <Link
                  to={
                    velogUsername
                      ? `/search?username=${velogUsername}`
                      : '/search'
                  }
                >
                  <SearchIcon2 className="search" />
                </Link>
              )}
              {user ? (
                <div className="logged-in">
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
                    username={user.username}
                    onLogout={onLogout}
                    visible={userMenu}
                  />
                </div>
              ) : (
                <RoundButton
                  color="darkGray"
                  onClick={onLoginClick}
                  className="login-button"
                >
                  로그인
                </RoundButton>
              )}
            </div>
          </div>
        </MainResponsive>
      </HeaderBlock>
      {floating && <Placeholder />}
    </>
  );
};

export default Header;

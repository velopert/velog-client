import React, { useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { NotificationIcon, SearchIcon3 } from '../../static/svg';
import RoundButton from '../common/RoundButton';
import MainResponsive from '../main/MainResponsive';
import useHeader from './hooks/useHeader';
import HeaderUserIcon from './HeaderUserIcon';
import useToggle from '../../lib/hooks/useToggle';
import HeaderUserMenu from './HeaderUserMenu';
import { Link } from 'react-router-dom';
import media from '../../lib/styles/media';
import HeaderLogo from './HeaderLogo';
import { themedPalette } from '../../lib/styles/themes';
import VLink from '../common/VLink';
import { useDispatch } from 'react-redux';
import { showAuthModal } from '../../modules/core';
import { useQuery } from '@apollo/react-hooks';
import { NOTIFICATION_COUNT } from '../../lib/graphql/notification';

export type MainHeaderProps = {};

function Header(props: MainHeaderProps) {
  const dispatch = useDispatch();
  const { data: notificationCountData, refetch } = useQuery(NOTIFICATION_COUNT);

  const { user, onLoginClick, onLogout, customHeader } = useHeader();
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

  const onClickNotification = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      event.preventDefault();
      dispatch(showAuthModal('LOGIN'));
      return;
    }
    refetch();
  };

  const notificationCount = notificationCountData?.notificationCount ?? 0;
  const urlForSearch = customHeader.custom
    ? `/search?username=${customHeader.username}`
    : '/search';

  return (
    <Block>
      <Inner>
        <HeaderLogo
          custom={customHeader.custom}
          userLogo={customHeader.userLogo}
          username={customHeader.username}
        />
        <Right>
          <NotificationButton to="/notifications" onClick={onClickNotification}>
            {user && notificationCount !== 0 && (
              <NotificationCounter
                isSingle={Math.floor(notificationCount / 10) === 0}
              >
                {Math.min(99, notificationCount)}
              </NotificationCounter>
            )}
            <NotificationIcon />
          </NotificationButton>
          <SearchButton to={urlForSearch}>
            <SearchIcon3 />
          </SearchButton>
          {user ? (
            <>
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
            </>
          ) : (
            <RoundButton color="darkGray" onClick={onLoginClick}>
              로그인
            </RoundButton>
          )}
        </Right>
      </Inner>
    </Block>
  );
}

const Block = styled.div`
  height: 4rem;
`;

// const StyledLink = styled(Link)`
//   display: flex;
//   align-items: center;
// `;

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
  color: ${themedPalette.text1};
  cursor: pointer;
  &:hover {
    background: ${themedPalette.slight_layer};
  }
  svg {
    width: 24px;
    height: 24px;
  }
  margin-right: 0.5rem;
`;

const NotificationButton = styled(VLink)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  border-radius: 50%;
  color: ${themedPalette.text1};
  cursor: pointer;
  margin-right: 4px;
  &:hover {
    background: ${themedPalette.slight_layer};
  }
  svg {
    width: 24px;
    height: 24px;
  }
`;

const NotificationCounter = styled.div<{ isSingle: boolean }>`
  position: absolute;
  top: 3px;
  right: -3px;
  padding: 1px 4px;
  font-weight: 500;
  font-size: 11px;
  background-color: var(--primary1);
  color: var(--button-text);
  border-radius: 100px;

  ${(props) =>
    props.isSingle &&
    css`
      right: 4px;
    `}
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

export default Header;

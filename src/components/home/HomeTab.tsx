import React, { useRef } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import {
  MdTrendingUp,
  MdAccessTime,
  MdMoreVert,
  MdArrowDropDown,
} from 'react-icons/md';
import { useSpring, animated } from 'react-spring';
import media, { mediaQuery } from '../../lib/styles/media';
import useToggle from '../../lib/hooks/useToggle';
import HomeMobileHeadExtra from './HomeMobileHeadExtra';
import TimeframePicker from './TimeframePicker';
import { useTimeframe } from './hooks/useTimeframe';
import { timeframes } from './utils/timeframeMap';

export type HomeTabProps = {};

function HomeTab(props: HomeTabProps) {
  const location = useLocation();

  const isRecent = location.pathname === '/recent';
  const [extra, toggle] = useToggle(false);
  const [timeframePicker, toggleTimeframePicker] = useToggle(false);
  const moreButtonRef = useRef<HTMLDivElement | null>(null);
  const timeframeRef = useRef<HTMLDivElement | null>(null);
  const [timeframe] = useTimeframe();

  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    if (!moreButtonRef.current) return;
    if (
      e.target === moreButtonRef.current ||
      moreButtonRef.current.contains(e.target as Node)
    ) {
      return;
    }
    toggle();
  };

  const onCloseTimeframePicker = (e: React.MouseEvent<HTMLElement>) => {
    if (!timeframeRef.current) return;
    if (
      e.target === timeframeRef.current ||
      timeframeRef.current.contains(e.target as Node)
    ) {
      return;
    }
    toggleTimeframePicker();
  };

  const springStyle = useSpring({
    left: isRecent ? '50%' : '0%',
    config: {
      friction: 16,
      tensiton: 160,
    },
  });

  return (
    <Wrapper>
      <Left>
        <Block>
          <NavLink
            to="/"
            activeClassName="active"
            isActive={(match, location) => {
              return ['/', '/trending'].indexOf(location.pathname) !== -1;
            }}
          >
            <MdTrendingUp />
            트렌딩
          </NavLink>
          <NavLink to="/recent" activeClassName="active">
            <MdAccessTime />
            최신
          </NavLink>
          <Indicator style={springStyle} />
        </Block>
        {['/', '/trending'].includes(location.pathname) && (
          <>
            <Selector onClick={toggleTimeframePicker} ref={timeframeRef}>
              {timeframes.find((t) => t[0] === timeframe)![1]}{' '}
              <MdArrowDropDown />
            </Selector>
            <TimeframePicker
              visible={timeframePicker}
              onClose={onCloseTimeframePicker}
            />
          </>
        )}
      </Left>
      <MobileMore ref={moreButtonRef}>
        <MdMoreVert className="more" onClick={toggle} />
      </MobileMore>
      <HomeMobileHeadExtra visible={extra} onClose={onClose} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .more {
    cursor: pointer;
    font-size: 1.5rem;
    color: ${palette.gray6};
  }
`;

const MobileMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Block = styled.div`
  display: flex;
  position: relative;
  width: 14rem;
  ${mediaQuery(944)} {
    width: 10rem;
  }
  a {
    width: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    text-decoration: none;
    color: ${palette.gray6};
    height: 3rem;

    svg {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
    &.active {
      color: ${themedPalette.text1};
      font-weight: bold;
    }

    ${mediaQuery(944)} {
      font-size: 1rem;
      width: 5rem;
      svg {
        font-size: 1.25rem;
      }
    }
  }
`;

const Indicator = styled(animated.div)`
  width: 50%;
  height: 2px;
  position: absolute;
  bottom: 0px;
  background: ${palette.gray8};
`;

const Selector = styled.div`
  background: ${themedPalette.bg_element1};
  height: 2rem;
  width: 6rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  color: ${themedPalette.text2};
  font-size: 0.875rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  cursor: pointer;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.75;
    }
  }
  ${media.medium} {
    width: 5.25rem;
    font-size: 0.75rem;
  }
`;

export default HomeTab;

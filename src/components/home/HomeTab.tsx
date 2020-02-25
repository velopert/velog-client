import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { MdTrendingUp, MdAccessTime } from 'react-icons/md';
import { useSpring, animated } from 'react-spring';

export type HomeTabProps = {};

function HomeTab(props: HomeTabProps) {
  const location = useLocation();

  const isRecent = location.pathname === '/recent';

  const springStyle = useSpring({
    left: isRecent ? '50%' : '0%',
    config: {
      friction: 16,
      tensiton: 160,
    },
  });

  return (
    <Block>
      <NavLink
        to="/trending"
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
  );
}

const Block = styled.div`
  margin-top: 1.5rem;
  display: flex;
  position: relative;
  width: 14rem;
  a {
    width: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    text-decoration: none;
    color: ${palette.gray6};
    height: 2.875rem;
    svg {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
    &.active {
      color: ${palette.gray8};
      font-weight: bold;
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

export default HomeTab;

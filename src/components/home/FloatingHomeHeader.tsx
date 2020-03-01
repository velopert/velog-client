import React, { useEffect, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import HomeHeader from './HomeHeader';
import HomeTab from './HomeTab';
import HomeResponsive from './HomeResponsive';
import { getScrollTop } from '../../lib/utils';

export type FloatingHomeHeaderProps = {};

function FloatingHomeHeader(props: FloatingHomeHeaderProps) {
  const [visible, setVisible] = useState(false);
  const [marginTop, setMarginTop] = useState(-102);

  const prevScrollTop = useRef(0);
  const direction = useRef<'UP' | 'DOWN'>('DOWN');
  const transitionPoint = useRef(0);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const nextDirection = prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';

    if (
      direction.current === 'DOWN' &&
      nextDirection === 'UP' &&
      transitionPoint.current - scrollTop < 0
    ) {
      setVisible(true);
      transitionPoint.current = scrollTop;
    }

    if (
      direction.current === 'UP' &&
      nextDirection === 'DOWN' &&
      scrollTop - transitionPoint.current < -102
    ) {
      transitionPoint.current = scrollTop + 102;
    }

    if (scrollTop < 64) {
      setVisible(false);
    }

    setMarginTop(Math.min(0, -102 + transitionPoint.current - scrollTop));

    direction.current = nextDirection;
    prevScrollTop.current = scrollTop;
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <Block
      style={
        visible
          ? {
              marginTop: marginTop,
              display: 'block',
            }
          : {
              display: 'none',
            }
      }
    >
      <HomeHeader />
      <div className="tab-wrapper">
        <HomeResponsive>
          <HomeTab />
        </HomeResponsive>
      </div>
      <div></div>
    </Block>
  );
}

const Block = styled.div`
  position: fixed;
  top: 0;
  background: white;
  width: 100%;
  z-index: 10;

  box-shadow: 0px 0 8px rgba(0, 0, 0, 0.08);
  .tab-wrapper {
    margin-top: -2rem;
  }
`;

export default FloatingHomeHeader;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getScrollTop } from '../../lib/utils';
import { createPortal } from 'react-dom';

const INITIAL_TOP = 510;
const FIXED_TOP = 80;
const MIN_HEIGHT = 694;
const MIN_WIDTH = 1140;

const Box = styled.div<{ fixed: boolean }>`
  position: ${({ fixed }) => (fixed ? 'fixed' : 'absolute')};
  top: ${({ fixed }) => (fixed ? `${FIXED_TOP}px` : `${INITIAL_TOP}px`)};
  right: calc(50% + 432px);
`;

const Actual = styled.div`
  width: 120px;
  height: 600px;

  @media (min-width: 1219px) {
    width: 160px;
  }

  @media (min-width: 1619px) {
    width: 300px;
  }
`;

function FuseSideAdInner() {
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = getScrollTop();
      const shouldBeFixed = scrollTop >= INITIAL_TOP - FIXED_TOP;
      setFixed(shouldBeFixed);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const fusetag = window.fusetag || (window.fusetag = { que: [] });

    fusetag.que.push(function () {
      const init = (fusetag as any).pageInit;
      if (!init) return;
      init({});
    });
  }, []);

  return (
    <Box fixed={fixed}>
      <Actual>
        <div data-fuse="sidebar_LHS"></div>
      </Actual>
    </Box>
  );
}

export default function FuseSideAd() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      const meetsHeight = window.innerHeight >= MIN_HEIGHT;
      const meetsWidth = window.innerWidth >= MIN_WIDTH;
      setVisible(meetsHeight && meetsWidth);
    };

    checkSize();
    window.addEventListener('resize', checkSize);

    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  if (!visible) return null;

  const target = document.getElementById('fuse-sidebar');
  if (!target) return null;

  return createPortal(<FuseSideAdInner />, target);
}

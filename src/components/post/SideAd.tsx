import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import { getScrollTop } from '../../lib/utils';

const Wrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  ${media.large} {
    display: none;
  }
`;

const Positioner = styled.div`
  position: absolute;
  top: 182px;
`;

const AdBlock = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  // background: #e0e0e0;
  // border-radius: 4px;
  display: flex;
  // color: #666;
  // font-size: 14px;
`;

function AdInsComponent() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'inline-block',
        width: '160px',
        height: '600px',
      }}
      data-ad-client="ca-pub-5574866530496701"
      data-ad-slot="1933254146"
    ></ins>
  );
}

export default function SideAd() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [y, setY] = useState(0);
  const element = useRef<HTMLDivElement | null>(null);

  const setup = useCallback(() => {
    if (!element.current) return;
    const pos = element.current.getBoundingClientRect();
    setY(pos.top + getScrollTop());
  }, []);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const nextFixed = scrollTop + 112 + 182 > y;
    if (fixed !== nextFixed) {
      setFixed(nextFixed);
    }
  }, [fixed, y]);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent,
      );
    const hasMinWidth = window.innerWidth >= 1200;

    setIsDesktop(!isMobile && hasMinWidth);
  }, []);

  useEffect(() => {
    setup();
  }, [setup]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const size = { width: 160, height: 600 };
  const leftPosition = '-208px';

  return (
    <Wrapper>
      <Positioner ref={element} style={{ left: leftPosition }}>
        {isDesktop ? (
          <AdBlock
            width={size.width}
            height={size.height}
            style={{
              position: fixed ? 'fixed' : undefined,
              top: fixed ? 282 : undefined,
            }}
          >
            <AdInsComponent />
          </AdBlock>
        ) : null}
      </Positioner>
    </Wrapper>
  );
}

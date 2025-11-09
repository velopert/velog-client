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
  top: 162px;
`;

const AdBlock = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: #e0e0e0;
  // border-radius: 4px;
  display: flex;
  // color: #666;
  // font-size: 14px;
`;

function AdInsComponent({
  width,
  height,
  slot,
}: {
  width: number;
  height: number;
  slot: string;
}) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'inline-block',
        width: `${width}px`,
        height: `${height}px`,
      }}
      data-ad-client="ca-pub-5574866530496701"
      data-ad-slot={slot}
    ></ins>
  );
}

export default function SideAd() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mode, setMode] = useState<'mini' | 'regular'>('regular');
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
    const nextFixed = scrollTop + 242 > y;
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
    const hasMinHeight = window.innerHeight >= 674;

    setIsDesktop(!isMobile && hasMinWidth && hasMinHeight);

    // Set mode based on window height
    const windowHeight = window.innerHeight;
    setMode(windowHeight < 864 ? 'mini' : 'regular');
  }, []);

  useEffect(() => {
    setup();
  }, [setup, mode]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Update mode based on height
      setMode(windowHeight < 864 ? 'mini' : 'regular');

      // Update isDesktop based on width and height
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent,
        );
      const hasMinWidth = windowWidth >= 1200;
      const hasMinHeight = windowHeight >= 674;

      setIsDesktop(!isMobile && hasMinWidth && hasMinHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const size =
    mode === 'mini' ? { width: 160, height: 500 } : { width: 160, height: 600 };
  const adSlot = mode === 'mini' ? '7825010541' : '1933254146';
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
              top: fixed ? 242 : undefined,
            }}
          >
            <AdInsComponent
              width={size.width}
              height={size.height}
              slot={adSlot}
            />
          </AdBlock>
        ) : null}
      </Positioner>
    </Wrapper>
  );
}

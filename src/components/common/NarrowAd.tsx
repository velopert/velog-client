import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import { isTablet } from '../../lib/deviceDetection';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
`;

const AdBlock = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
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

export default function NarrowAd() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [mode, setMode] = useState<'wide' | 'narrow'>('wide');

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const checkIsMobile =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent,
      );
    const checkIsTablet = isTablet();

    setIsMobileOrTablet(checkIsMobile || checkIsTablet);

    // Set mode based on window width
    const windowWidth = window.innerWidth;
    setMode(windowWidth < 768 ? 'narrow' : 'wide');
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      // Update mode based on width
      setMode(windowWidth < 768 ? 'narrow' : 'wide');
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const size =
    mode === 'narrow' ? { width: 300, height: 50 } : { width: 728, height: 90 };
  const adSlot = mode === 'narrow' ? '1778476944' : '5606751754';

  return (
    <Wrapper>
      {isMobileOrTablet && mode === 'narrow' && (
        <AdBlock width={size.width} height={size.height}>
          <AdInsComponent
            width={size.width}
            height={size.height}
            slot={adSlot}
          />
        </AdBlock>
      )}
      {isMobileOrTablet && mode === 'wide' && (
        <AdBlock width={size.width} height={size.height}>
          <AdInsComponent
            width={size.width}
            height={size.height}
            slot={adSlot}
          />
        </AdBlock>
      )}
    </Wrapper>
  );
}

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mediaQuery } from '../../lib/styles/media';
import gtag from '../../lib/gtag';

function AdFeed({ forPost, index }: { forPost?: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const width = window.innerWidth;
  //   if (width < 768) {
  //     setIsMobile(true);
  //   }

  //   setTimeout(() => {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({});
  //   }, 250);
  // }, []);
  useEffect(() => {
    if (forPost) return;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [forPost]);

  useEffect(() => {
    if (!forPost) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !initializedRef.current) {
            initializedRef.current = true;
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        });
      },
      {
        rootMargin: '90px',
        threshold: 0,
      },
    );
    observer.observe(ref.current!);
    return () => {
      observer.disconnect();
    };
  }, [forPost]);

  return (
    <Block
      ref={ref}
      forPost={forPost}
      onClick={() => {
        if (forPost) {
          gtag('event', 'ads_click', { event_label: index });
        }
      }}
    >
      {forPost ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-6u+e5+1a-3q+77"
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="8480422066"
        ></ins>
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-6u+e7+18-4k+8t"
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="3828701581"
        ></ins>
      )}
      {/* {isMobile ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-6z+el+w-4n+70"
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="8258809297"
        ></ins>
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="6548419604"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      )} */}
    </Block>
  );
}

const Block = styled.div<{ forPost?: boolean }>`
  width: 20rem;
  margin: 1rem;
  min-height: 23.5625rem;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);
  background: white;

  ${mediaQuery(1056)} {
    width: calc(50% - 2rem);
  }
  ${mediaQuery(767)} {
    margin: 0;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-height: 5rem;
  }
`;

export default AdFeed;

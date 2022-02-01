import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../lib/hooks/useTheme';
interface Props {
  isMobile?: boolean;
}

function RelatedPostAd({ isMobile }: Props) {
  const initializedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!initializedRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, [isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !initializedRef.current) {
            initializedRef.current = true;
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            console.log('initialized!');
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
  }, []);

  if (isMobile) {
    return (
      <div ref={ref}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="8181679131"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
  return (
    <div ref={ref}>
      {theme === 'dark' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-79+ew-1a-28+94"
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="2892342366"
        ></ins>
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-7n+eu-z-1k+6t"
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="9497725960"
        />
      )}
    </div>
  );
}

export default RelatedPostAd;

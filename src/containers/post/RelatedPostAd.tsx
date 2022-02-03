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
        {theme === 'dark' ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-format="fluid"
            data-ad-layout-key="-fb+5w+4e-db+86"
            data-ad-client="ca-pub-5574866530496701"
            data-ad-slot="9916259177"
          ></ins>
        ) : (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-format="fluid"
            data-ad-layout-key="-gh+5l+k-cu+l4"
            data-ad-client="ca-pub-5574866530496701"
            data-ad-slot="8237449336"
          ></ins>
        )}
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
          data-ad-layout-key="-73+ex-1g-2s+as"
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

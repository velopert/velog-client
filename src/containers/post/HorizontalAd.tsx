import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
interface Props {}

function HorizontalAd({}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

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
    if (!ref.current) return;
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <VelogResponsive>
      <Wrapper ref={ref}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="8809887603"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </Wrapper>
    </VelogResponsive>
  );
}

const Wrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  ins {
    max-height: 400px;
  }
`;

export default HorizontalAd;

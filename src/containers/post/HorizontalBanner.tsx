import React, { useEffect } from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
import gtag from '../../lib/gtag';

function HorizontalBanner() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  const onClick = () => {
    gtag('event', 'banner_click');
  };

  return (
    <StyledResponsive onClick={onClick}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-9161852896103498"
        data-ad-slot="6869845586"
      ></ins>
    </StyledResponsive>
  );
}

const StyledResponsive = styled(VelogResponsive)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export default HorizontalBanner;

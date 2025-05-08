import React, { useEffect } from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
import gtag from '../../lib/gtag';

type Props = {
  isDisplayAd?: boolean;
};

function HorizontalBanner({ isDisplayAd = false }: Props) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  const onClick = () => {
    gtag('event', 'banner_click');
  };

  return (
    <StyledResponsive onClick={onClick}>
      {isDisplayAd ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="8809887603"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="1310741884"
        ></ins>
      )}
    </StyledResponsive>
  );
}

const StyledResponsive = styled(VelogResponsive)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export default HorizontalBanner;

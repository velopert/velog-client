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
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-5574866530496701"
        data-ad-slot="7675625634"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </StyledResponsive>
  );
}

const StyledResponsive = styled(VelogResponsive)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export default HorizontalBanner;

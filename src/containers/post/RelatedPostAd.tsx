import React, { useEffect } from 'react';
interface Props {
  isMobile?: boolean;
}

function RelatedPostAd({ isMobile }: Props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, [isMobile]);

  if (isMobile) {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-g0+63+39-d3+b4"
        data-ad-client="ca-pub-5574866530496701"
        data-ad-slot="8237449336"
      />
    );
  }
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="fluid"
      data-ad-layout-key="-7v+er-k-t+3r"
      data-ad-client="ca-pub-5574866530496701"
      data-ad-slot="9497725960"
    />
  );
}

export default RelatedPostAd;

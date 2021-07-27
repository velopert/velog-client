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
        data-ad-layout-key="-g0+60+3y-ct+85"
        data-ad-client="ca-pub-5574866530496701"
        data-ad-slot="8237449336"
      ></ins>
    );
  }
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="fluid"
      data-ad-layout-key="-7q+de+1z+n+3"
      data-ad-client="ca-pub-5574866530496701"
      data-ad-slot="9497725960"
    ></ins>
  );
}

export default RelatedPostAd;

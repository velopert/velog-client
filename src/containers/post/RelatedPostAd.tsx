import React, { useEffect } from 'react';
interface Props {}

function RelatedPostAd(props: Props) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

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

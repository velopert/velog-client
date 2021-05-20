import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
import { detectAnyAdblocker } from 'just-detect-adblock';
import media from '../../lib/styles/media';

function RelatedPost({ showAds }: { showAds: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setIsMobile(true);
    }

    setTimeout(() => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, 250);
  }, []);

  useEffect(() => {
    detectAnyAdblocker().then((detected: boolean) => {
      if (detected) {
        setVisible(false);
      }
    });
  }, []);

  if (!visible) return null;

  return (
    <Wrapper>
      <h4>관심 있을 만한 포스트</h4>
      {!isMobile && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot={showAds ? '3841144022' : '7478357897'}
          data-matched-content-ui-type="image_stacked"
          data-matched-content-rows-num="2"
          data-matched-content-columns-num="3"
        ></ins>
      )}
      {isMobile && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot={showAds ? '3841144022' : '7478357897'}
          data-matched-content-ui-type="image_stacked"
          data-matched-content-rows-num="3"
          data-matched-content-columns-num="2"
        ></ins>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(VelogResponsive)`
  margin-top: 4rem;
  margin-bottom: 3rem;
  ${media.small} {
    flex-direction: column-reverse;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default RelatedPost;

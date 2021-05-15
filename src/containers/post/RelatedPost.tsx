import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
import { detectAnyAdblocker } from 'just-detect-adblock';

type RelatedPostProps = {
  type: 'desktop' | 'mobile';
};
function RelatedPost({ type }: RelatedPostProps) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const width = window.innerWidth;
      if (type === 'desktop' && width < 768) {
        setVisible(false);
        return;
      }
      if (type === 'mobile' && width >= 768) {
        setVisible(false);
        return;
      }
      setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 500);
    }, 250);
  }, [type]);

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
      {type === 'desktop' && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="4990574169"
          data-matched-content-ui-type="image_stacked"
          data-matched-content-rows-num="2"
          data-matched-content-columns-num="3"
        ></ins>
      )}
      {type === 'mobile' && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-5574866530496701"
          data-ad-slot="4990574169"
          data-matched-content-ui-type="image_stacked"
          data-matched-content-rows-num="6"
          data-matched-content-columns-num="1"
        ></ins>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(VelogResponsive)`
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 4rem;
  margin-bottom: 3rem;
`;

export default RelatedPost;

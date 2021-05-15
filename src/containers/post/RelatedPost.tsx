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
    const width = window.innerWidth;
    if (type === 'desktop' && width < 468) {
      setVisible(false);
      return;
    }
    if (type === 'mobile' && width >= 468) {
      setVisible(false);
      return;
    }
    (window.adsbygoogle = window.adsbygoogle || []).push({});
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
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-5574866530496701"
        data-ad-slot="4990574169"
      ></ins>
    </Wrapper>
  );
}

const Wrapper = styled(VelogResponsive)`
  margin-top: 4rem;
  margin-bottom: 3rem;
`;

export default RelatedPost;

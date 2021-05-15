import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';

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

  if (!visible) return null;

  return (
    <Wrapper>
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
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export default RelatedPost;

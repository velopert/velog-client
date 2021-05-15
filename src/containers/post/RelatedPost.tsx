import React, { useEffect } from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';

function RelatedPost() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

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

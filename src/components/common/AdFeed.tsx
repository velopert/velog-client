import React, { useEffect } from 'react';
import styled from 'styled-components';
import { mediaQuery } from '../../lib/styles/media';

function AdFeed() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <Block>
      {/* <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-6z+el+w-4n+70"
        data-ad-client="ca-pub-5574866530496701"
        data-ad-slot="8258809297"
      ></ins> */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5574866530496701"
        data-ad-slot="6548419604"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Block>
  );
}

const Block = styled.div`
  width: 20rem;
  margin: 1rem;
  min-height: 23.5625rem;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);
  background: white;

  ${mediaQuery(1056)} {
    width: calc(50% - 2rem);
  }
  ${mediaQuery(767)} {
    margin: 0;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-height: 5rem;
  }
`;

export default AdFeed;

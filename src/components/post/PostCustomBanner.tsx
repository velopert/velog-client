import React from 'react';
import styled from 'styled-components';
import VelogResponsive from '../velog/VelogResponsive';
import gtag from '../../lib/gtag';
import media from '../../lib/styles/media';

interface PostCustomBannerProps {
  image: string;
  url: string;
}

const onClick = () => {
  gtag('event', 'ads_banner_click');
};

const PostCustomBanner: React.FC<PostCustomBannerProps> = ({ image, url }) => {
  return (
    <PostCustomBannerBlock onClick={onClick}>
      <a href={url} target="_blank">
        <img src={image} alt="post-custom-banner" />
      </a>
    </PostCustomBannerBlock>
  );
};

const PostCustomBannerBlock = styled(VelogResponsive)`
  max-width: 100%;
  height: auto;
  margin-top: 1rem;

  ${media.small} {
    margin-top: 0.5rem;
  }

  img {
    display: block;
    width: 100%;
    object-fit: contain;
  }
`;

export default PostCustomBanner;

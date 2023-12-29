import React from 'react';
import HorizontalBanner from '../../containers/post/HorizontalBanner';
import PostCustomBanner from './PostCustomBanner';

interface PostBannerProps {
  isDisplayAd?: boolean;
  customAd: { image: string; url: string } | null;
}

const PostBanner: React.FC<PostBannerProps> = ({ isDisplayAd, customAd }) => {
  if (customAd) {
    return <PostCustomBanner image={customAd.image} url={customAd.url} />;
  }
  return <HorizontalBanner isDisplayAd={isDisplayAd} />;
};

export default PostBanner;

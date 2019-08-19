import React from 'react';
import styled from 'styled-components';

const RatioImageBlock = styled.div`
  width: 100%;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export interface RatioImageProps {
  widthRatio: number;
  heightRatio: number;
  src: string;
  alt?: string;
}

const RatioImage: React.FC<RatioImageProps> = ({
  widthRatio,
  heightRatio,
  src,
  alt,
}) => {
  const paddingTop = `${(heightRatio / widthRatio) * 100}%`;

  return (
    <RatioImageBlock
      style={{
        paddingTop,
      }}
    >
      <img src={src} alt={alt} />
    </RatioImageBlock>
  );
};

export default RatioImage;

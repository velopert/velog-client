import React from 'react';
import styled from 'styled-components';
import Skeleton from '../common/Skeleton';
import VelogResponsive from '../velog/VelogResponsive';

export type PostSkeletonProps = {};

function PostSkeleton(props: PostSkeletonProps) {
  const skeletonParagraph = (
    <p>
      <div className="line">
        {[3, 5, 2, 7, 6, 5, 4].map((flex, index) => (
          <Skeleton flex={flex} key={index} />
        ))}
      </div>
      <div className="line">
        {[4, 2, 6, 3, 7, 4, 2].map((flex, index) => (
          <Skeleton flex={flex} key={index} />
        ))}
      </div>
      <div className="line">
        {[4, 2, 4, 3, 2, 7, 3].map((flex, index) => (
          <Skeleton flex={flex} key={index} />
        ))}
      </div>
      <div className="line" style={{ paddingRight: '8rem' }}>
        {[4, 6, 3, 2, 3].map((flex, index) => (
          <Skeleton flex={flex} key={index} />
        ))}
      </div>
    </p>
  );
  return (
    <Block>
      <h1>
        <Skeleton flex={6} />
        <Skeleton flex={2} />
        <Skeleton flex={5} />
        <Skeleton flex={2} />
        <Skeleton flex={3} />
      </h1>
      <div className="subinfo">
        <Skeleton width="5rem" marginRight="1.5rem" noSpacing />
        <Skeleton width="7.5rem" noSpacing />
      </div>
      <div className="tags">
        <Skeleton width="4rem" marginRight="0.875rem" noSpacing />
        <Skeleton width="6rem" noSpacing marginRight="0.875rem" />
        <Skeleton width="5rem" noSpacing />
      </div>
      <div className="series">
        <Skeleton width="100%" height="10.75rem" />
      </div>
      <div className="thumbnail">
        <Skeleton width="100%" height="27rem" />
      </div>
      <div className="contents">
        {skeletonParagraph}
        {skeletonParagraph}
        {skeletonParagraph}
      </div>
    </Block>
  );
}

const Block = styled(VelogResponsive)`
  margin-top: 5.5rem;
  h1 {
    padding-right: 2rem;
    font-size: 3.75rem;
    margin-top: 0;
    margin-bottom: 2rem;
    display: flex;
  }
  .subinfo {
    font-size: 1rem;
  }
  .tags {
    font-size: 2rem;
    margin-top: 0.875rem;
  }
  .series {
    margin-top: 2rem;
  }
  .thumbnail {
    margin-top: 2rem;
  }
  .contents {
    margin-top: 5rem;
    .line {
      margin-bottom: 0.75rem;
      display: flex;
      font-size: 1.125rem;
    }
    p + p {
      margin-top: 3rem;
    }
  }
`;

export default PostSkeleton;

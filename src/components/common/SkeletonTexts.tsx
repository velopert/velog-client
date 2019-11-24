import React from 'react';
import Skeleton from './Skeleton';

type SkeletonTextsProps = {
  wordLengths: number[];
  useFlex?: boolean;
};

function SkeletonTexts({ wordLengths, useFlex }: SkeletonTextsProps) {
  return (
    <>
      {wordLengths.map((length, index) => {
        const props = {
          [useFlex ? 'flex' : 'width']: useFlex ? length : `${length}rem`,
        };
        return <Skeleton key={index} {...props} />;
      })}
    </>
  );
}

export default SkeletonTexts;

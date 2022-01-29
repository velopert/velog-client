import React from 'react';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import styled from 'styled-components';
import media from '../../lib/styles/media';

const Info = styled.p`
  margin-bottom: 4rem;
  font-size: 1.125rem;
  line-height: 1.5;
  ${media.small} {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  color: ${themedPalette.text2};
  b {
    color: ${themedPalette.text1};
  }
`;
export interface SearchResultInfoProps {
  count: number;
  className?: string;
}

function SearchResultInfo({ count, className }: SearchResultInfoProps) {
  if (count === 0) {
    return <Info>검색 결과가 없습니다.</Info>;
  }
  return (
    <Info>
      총 <b>{count}개</b>의 포스트를 찾았습니다.
    </Info>
  );
}

export default SearchResultInfo;

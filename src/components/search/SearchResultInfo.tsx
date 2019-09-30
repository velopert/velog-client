import React from 'react';
import palette from '../../lib/styles/palette';
import styled from 'styled-components';

const Info = styled.p`
  margin-bottom: 4rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: ${palette.gray7};
  b {
    color: ${palette.gray9};
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

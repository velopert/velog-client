import React from 'react';
import SearchResultInfo from '../../components/search/SearchResultInfo';

export interface SearchResultProps {}

function SearchResult(props: SearchResultProps) {
  return (
    <>
      <SearchResultInfo count={0} />
    </>
  );
}

export default SearchResult;

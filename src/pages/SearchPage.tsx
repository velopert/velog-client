import React from 'react';
import SearchTemplate from '../components/search/SearchTemplate';
import LargeSearchInput from '../containers/search/LargeSearchInput';
import SearchResult from '../containers/search/SearchResult';

export interface SearchPageProps {}

function SearchPage(props: SearchPageProps) {
  return (
    <SearchTemplate>
      <LargeSearchInput />
      <SearchResult />
    </SearchTemplate>
  );
}

export default SearchPage;

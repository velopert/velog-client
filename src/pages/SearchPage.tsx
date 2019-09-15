import React from 'react';
import SearchTemplate from '../components/search/SearchTemplate';
import LargeSearchInput from '../containers/search/LargeSearchInput';

export interface SearchPageProps {}

function SearchPage(props: SearchPageProps) {
  return (
    <SearchTemplate>
      <LargeSearchInput />
    </SearchTemplate>
  );
}

export default SearchPage;

import React, { useMemo } from 'react';
import SearchTemplate from '../components/search/SearchTemplate';
import LargeSearchInput from '../containers/search/LargeSearchInput';
import SearchResult from '../containers/search/SearchResult';
import { RouteComponentProps } from 'react-router';
import qs from 'qs';

export interface SearchPageProps extends RouteComponentProps {}

function SearchPage({ location }: SearchPageProps) {
  const keyword = useMemo(() => {
    const { q } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    return q;
  }, [location.search]);
  return (
    <SearchTemplate>
      <LargeSearchInput initialKeyword={keyword} />
      <SearchResult keyword={keyword} />
    </SearchTemplate>
  );
}

export default SearchPage;

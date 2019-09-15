import React, { useMemo, useCallback } from 'react';
import SearchInput from '../../components/search/SearchInput';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router';
import qs from 'qs';

const StyledSearchInput = styled(SearchInput)`
  margin-bottom: 1.5rem;
`;

export interface LargeSearchInputProps extends RouteComponentProps {}

function LargeSearchInput({ history, location }: LargeSearchInputProps) {
  const onSearch = useCallback(
    (keyword: string) => history.replace(`/search?q=${keyword}`),
    [history],
  );
  const initialKeyword = useMemo(() => {
    const { q } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    return q;
  }, [location.search]);
  return (
    <StyledSearchInput
      onSearch={onSearch}
      initial={initialKeyword}
      large
      searchAsYouType
    />
  );
}

export default withRouter(LargeSearchInput);

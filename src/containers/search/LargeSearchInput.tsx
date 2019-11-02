import React, { useCallback } from 'react';
import SearchInput from '../../components/search/SearchInput';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router';

const StyledSearchInput = styled(SearchInput)`
  margin-bottom: 1.5rem;
`;

export interface LargeSearchInputProps extends RouteComponentProps {
  initialKeyword: string;
}

function LargeSearchInput({ history, initialKeyword }: LargeSearchInputProps) {
  const onSearch = useCallback(
    (keyword: string) => history.replace(`/search?q=${keyword}`),
    [history],
  );

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

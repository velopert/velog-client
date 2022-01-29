import React, { useCallback } from 'react';
import SearchInput from '../../components/search/SearchInput';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router';
import qs from 'qs';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';

const StyledSearchInput = styled(SearchInput)`
  margin-bottom: 1.5rem;
`;

export interface LargeSearchInputProps extends RouteComponentProps {
  initialKeyword: string;
}

function LargeSearchInput({
  history,
  initialKeyword,
  location,
}: LargeSearchInputProps) {
  const { username } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as { username: string | undefined };

  const onSearch = useCallback(
    (keyword: string) => {
      const query = qs.stringify({
        q: keyword,
        username,
      });
      history.replace(`/search?${query}`);
    },
    [history, username],
  );

  return (
    <Block>
      {username && (
        <div className="user-search-description">
          {username}님이 작성한 포스트 검색
        </div>
      )}
      <StyledSearchInput
        onSearch={onSearch}
        initial={initialKeyword}
        large
        searchAsYouType
      />
    </Block>
  );
}

const Block = styled.div`
  .user-search-description {
    margin-top: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${palette.gray8};
  }
`;
export default withRouter(LargeSearchInput);

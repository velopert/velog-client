import React from 'react';
import UserPosts from '../../../containers/velog/UserPosts';
import { RouteComponentProps } from 'react-router';
import qs from 'qs';
import VelogSearchInputContainer from '../../../containers/velog/VelogSearchInputContainer';
import SearchResult from '../../../containers/search/SearchResult';
import styled from 'styled-components';
import media from '../../../lib/styles/media';

export interface UserPostsTabProps
  extends RouteComponentProps<{ username: string }> {
  username: string;
}

const UserPostsTab: React.FC<UserPostsTabProps> = ({ match, location }) => {
  const { q }: { q: string | undefined } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const { username } = match.params;

  return (
    <>
      <OnlyOnMobile>
        <VelogSearchInputContainer
          initial={q || ''}
          username={match.params.username}
        />
      </OnlyOnMobile>
      <Block>
        {q ? (
          <SearchResult username={username} keyword={q} />
        ) : (
          <UserPosts username={match.params.username} />
        )}
      </Block>
    </>
  );
};

const OnlyOnMobile = styled.div`
  display: none;
  ${media.medium} {
    display: none;
  }
`;

const Block = styled.div`
  ${media.small} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default UserPostsTab;

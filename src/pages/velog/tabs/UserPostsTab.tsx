import React from 'react';
import UserPosts from '../../../containers/velog/UserPosts';
import { RouteComponentProps } from 'react-router';
import qs from 'qs';
import VelogSearchInputContainer from '../../../containers/velog/VelogSearchInputContainer';
import SearchResult from '../../../containers/search/SearchResult';

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
      <VelogSearchInputContainer
        initial={q || ''}
        username={match.params.username}
      />
      {q ? (
        <SearchResult username={username} keyword={q} />
      ) : (
        <UserPosts username={match.params.username} />
      )}
    </>
  );
};

export default UserPostsTab;

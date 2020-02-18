import React, { useEffect } from 'react';
import UserPosts from '../../../containers/velog/UserPosts';
import { RouteComponentProps } from 'react-router';
import qs from 'qs';
import VelogSearchInputContainer from '../../../containers/velog/VelogSearchInputContainer';
import SearchResult from '../../../containers/search/SearchResult';
import styled from 'styled-components';
import media from '../../../lib/styles/media';
import usePreserveScroll from '../../../lib/hooks/usePreserveScroll';
import { Helmet } from 'react-helmet-async';
import { usePrevious } from 'react-use';
import UserTags from '../../../components/velog/UserTags';

export interface UserPostsTabProps
  extends RouteComponentProps<{ username: string }> {
  username: string;
}

const UserPostsTab: React.FC<UserPostsTabProps> = ({
  match,
  location,
  history,
}) => {
  const {
    q,
    tag,
  }: { q: string | undefined; tag: string | undefined } = qs.parse(
    location.search,
    {
      ignoreQueryPrefix: true,
    },
  );

  const { username } = match.params;
  usePreserveScroll('user/posts');

  const prevTag = usePrevious(tag);
  useEffect(() => {
    if (prevTag !== tag) {
      window.scrollTo(0, 0);
    }
  }, [prevTag, tag]);

  return (
    <div>
      <HideOnMobile>
        <Helmet>
          <link
            data-rh="true"
            rel="alternate"
            type="application/rss+xml"
            title="RSS"
            href={`https://v2.velog.io/rss/${username}`}
          />
        </Helmet>
        <VelogSearchInputContainer
          initial={q || ''}
          username={match.params.username}
        />
      </HideOnMobile>
      <TagWrapper>
        <UserTags username={username} tag={tag || null} />
      </TagWrapper>
      <Block>
        {q ? (
          <SearchResult username={username} keyword={q} />
        ) : (
          <UserPosts username={match.params.username} tag={tag || null} />
        )}
      </Block>
    </div>
  );
};

const HideOnMobile = styled.div`
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

const TagWrapper = styled.div`
  position: relative;
`;
export default UserPostsTab;

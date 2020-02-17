import React, { useEffect } from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
import UserProfileContainer from '../../containers/velog/UserProfileContainer';
import { RouteComponentProps, Route } from 'react-router';
import VelogTab from '../../components/velog/VelogTab';
import UserPostsTab from './tabs/UserPostsTab';
import SeriesTab from './tabs/SeriesTab';
import AboutTab from './tabs/AboutTab';
import palette from '../../lib/styles/palette';
import media from '../../lib/styles/media';
import UserTags from '../../components/velog/UserTags';
import qs from 'qs';
import { usePrevious } from 'react-use';

const UserPageBlock = styled(VelogResponsive)``;

export interface UserPageProps
  extends RouteComponentProps<{ username: string; tab?: 'series' | 'about' }> {}

const UserPage: React.FC<UserPageProps> = ({ match, location }) => {
  const { username, tab } = match.params;
  const { tag } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as { tag: string | undefined };

  const prevTag = usePrevious(tag);
  useEffect(() => {
    if (prevTag !== tag) {
      window.scrollTo(0, 0);
    }
  }, [prevTag, tag]);

  return (
    <UserPageBlock>
      <UserProfileContainer username={username} />
      <MobileSeparator />
      <VelogTab username={username} tab={tab || 'posts'} />
      <UserTags username={username} tag={tag || null} />
      <Route path="/@:username" exact component={UserPostsTab} />
      <Route path="/@:username/series" component={SeriesTab} />
      <Route path="/@:username/about" component={AboutTab} />
    </UserPageBlock>
  );
};

const MobileSeparator = styled.div`
  background: ${palette.gray1};
  height: 1rem;
  margin-top: 2rem;

  box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.04),
    inset 0 -8px 8px -8px rgba(0, 0, 0, 0.04);
  display: none;
  ${media.small} {
    display: block;
  }
`;

export default UserPage;

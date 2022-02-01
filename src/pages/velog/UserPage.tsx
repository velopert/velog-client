import React from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
import UserProfileContainer from '../../containers/velog/UserProfileContainer';
import { RouteComponentProps, Route } from 'react-router';
import VelogTab from '../../components/velog/VelogTab';
import UserPostsTab from './tabs/UserPostsTab';
import SeriesTab from './tabs/SeriesTab';
import AboutTab from './tabs/AboutTab';
import { themedPalette } from '../../lib/styles/themes';
import media from '../../lib/styles/media';

const UserPageBlock = styled(VelogResponsive)``;

export interface UserPageProps
  extends RouteComponentProps<{ username: string; tab?: 'series' | 'about' }> {}

const UserPage: React.FC<UserPageProps> = ({ match, location }) => {
  const { username, tab } = match.params;

  return (
    <UserPageBlock>
      <UserProfileContainer username={username} />
      <MobileSeparator />
      <VelogTab username={username} tab={tab || 'posts'} />
      <Route path="/@:username" exact component={UserPostsTab} />
      <Route path="/@:username/series" component={SeriesTab} />
      <Route path="/@:username/about" component={AboutTab} />
    </UserPageBlock>
  );
};

const MobileSeparator = styled.div`
  background: ${themedPalette.bg_element2};
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

import React from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
import UserProfileContainer from '../../containers/velog/UserProfileContainer';
import { RouteComponentProps, Route } from 'react-router';
import VelogTab from '../../components/velog/VelogTab';
import UserPostsTab from './tabs/UserPostsTab';

const UserPageBlock = styled(VelogResponsive)``;

export interface UserPageProps
  extends RouteComponentProps<{ username: string; tab?: 'series' | 'about' }> {}

const UserPage: React.FC<UserPageProps> = ({ match }) => {
  const { username, tab } = match.params;

  return (
    <UserPageBlock>
      <UserProfileContainer username={username} />
      <VelogTab username={username} tab={tab || 'posts'} />
      <Route path="/@:username" exact component={UserPostsTab} />
    </UserPageBlock>
  );
};

export default UserPage;

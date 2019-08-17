import React from 'react';
import styled from 'styled-components';
import VelogResponsive from '../../components/velog/VelogResponsive';
import UserProfileContainer from '../../containers/velog/UserProfileContainer';
import { RouteComponentProps } from 'react-router';

const UserPageBlock = styled(VelogResponsive)``;

export interface UserPageProps
  extends RouteComponentProps<{ username: string }> {}

const UserPage: React.FC<UserPageProps> = ({ match }) => {
  const { username } = match.params;

  return (
    <UserPageBlock>
      <UserProfileContainer username={username} />
    </UserPageBlock>
  );
};

export default UserPage;

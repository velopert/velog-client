import React from 'react';
import styled from 'styled-components';
import UserProfile from '../../components/common/UserProfile';
import VelogResponsive from '../../components/velog/VelogResponsive';

const UserPageBlock = styled(VelogResponsive)``;
const StyledUserProfile = styled(UserProfile)`
  margin-top: 90px;
`;

export interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = props => {
  return (
    <UserPageBlock>
      <StyledUserProfile />
    </UserPageBlock>
  );
};

export default UserPage;

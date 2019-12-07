import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import {
  GET_USER_PROFILE,
  GetUserProfileResponse,
} from '../../lib/graphql/user';
import UserProfile, {
  UserProfileSkeleton,
} from '../../components/common/UserProfile';

const StyledUserProfile = styled(UserProfile)`
  margin-top: 90px;
`;

const StyledUserProfileSkeleton = styled(UserProfileSkeleton)`
  margin-top: 90px;
`;

export interface UserProfileContainerProps {
  username: string;
}

const UserProfileContainer: React.FC<UserProfileContainerProps> = ({
  username,
}) => {
  const { data, loading, error } = useQuery<GetUserProfileResponse>(
    GET_USER_PROFILE,
    {
      variables: {
        username,
      },
    },
  );

  if (loading || error || !data || !data.user)
    return <StyledUserProfileSkeleton />;

  const {
    display_name,
    short_bio,
    profile_links,
    thumbnail,
  } = data.user.profile;

  return (
    <StyledUserProfile
      displayName={display_name}
      description={short_bio}
      profileLinks={profile_links}
      thumbnail={thumbnail}
      username={username}
    />
  );
};

export default UserProfileContainer;

import React from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import {
  GET_USER_PROFILE,
  GetUserProfileResponse,
} from '../../lib/graphql/user';
import UserProfile, {
  UserProfileSkeleton,
} from '../../components/common/UserProfile';
import media from '../../lib/styles/media';

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

const sharedStyle = css`
  margin-top: 5.625rem;
  ${media.small} {
    margin-top: 3rem;
  }
`;

const StyledUserProfile = styled(UserProfile)`
  ${sharedStyle};
`;

const StyledUserProfileSkeleton = styled(UserProfileSkeleton)`
  ${sharedStyle};
`;

export default UserProfileContainer;

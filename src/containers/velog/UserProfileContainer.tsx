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
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export interface UserProfileContainerProps {
  username: string;
}

const UserProfileContainer: React.FC<UserProfileContainerProps> = ({
  username,
}) => {
  const location = useLocation();
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

  const { display_name, short_bio, profile_links, thumbnail } =
    data.user.profile;

  const isSeries = location.pathname.includes('/series');

  return (
    <>
      <Helmet>
        <title>{`${username} (${display_name}) ${
          isSeries ? '/ 시리즈' : ''
        }- velog`}</title>
        <meta
          name="description"
          content={
            isSeries
              ? `${username}님이 작성한 포스트 시리즈들을 확인해보세요.`
              : short_bio
          }
        />
      </Helmet>
      <StyledUserProfile
        displayName={display_name}
        description={short_bio}
        profileLinks={profile_links}
        thumbnail={thumbnail}
        username={username}
      />
    </>
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

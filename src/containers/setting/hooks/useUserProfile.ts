import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useCallback } from 'react';
import { safe } from '../../../lib/utils';

const GET_MY_PROFILE = gql`
  query {
    auth {
      id
      profile {
        id
        display_name
        short_bio
        thumbnail
        profile_links
      }
      user_meta {
        id
        email_notification
        email_promotion
      }
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($display_name: String!, $short_bio: String!) {
    update_profile(display_name: $display_name, short_bio: $short_bio) {
      id
      display_name
      short_bio
    }
  }
`;

export default function useUserProfile() {
  const { data, loading } = useQuery<{
    auth: {
      id: string;
      profile: {
        id: string;
        display_name: string;
        short_bio: string;
        thumbnail: string | null;
        profile_links: {
          url?: string;
          github?: string;
          facebook?: string;
          twitter?: string;
          email?: string;
        };
      };
      user_meta: {
        id: string;
        email_notification: boolean;
        email_promotion: boolean;
      };
    };
  }>(GET_MY_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const update = useCallback(
    (params: { displayName: string; shortBio: string }) => {
      return updateProfile({
        variables: {
          display_name: params.displayName,
          short_bio: params.shortBio,
        },
      });
    },
    [updateProfile],
  );

  return {
    profile: data && data.auth && data.auth.profile,
    meta: safe(() => data!.auth!.user_meta),
    loading,
    update,
  };
}

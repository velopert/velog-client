import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useCallback } from 'react';
import { ProfileLinks } from '../../../lib/graphql/user';

const UPDATE_SOCIAL_INFO = gql`
  mutation UpdateSocialInfo($profile_links: JSON!) {
    update_social_info(profile_links: $profile_links) {
      id
      profile_links
    }
  }
`;

export default function useUpdateSocialInfo() {
  const [updateSocialInfo, { loading }] = useMutation(UPDATE_SOCIAL_INFO);
  const update = useCallback(
    (profileLinks: ProfileLinks) => {
      return updateSocialInfo({
        variables: {
          profile_links: profileLinks,
        },
      });
    },
    [updateSocialInfo],
  );

  return {
    update,
    loading,
  };
}

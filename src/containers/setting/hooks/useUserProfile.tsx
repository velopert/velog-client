import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_MY_PROFILE = gql`
  query {
    auth {
      id
      profile {
        id
        display_name
        short_bio
        thumbnail
      }
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
      };
    };
  }>(GET_MY_PROFILE);

  return {
    profile: data && data.auth && data.auth.profile,
    loading,
  };
}

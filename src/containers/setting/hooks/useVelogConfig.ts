import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { safe } from '../../../lib/utils';
import { useCallback } from 'react';

const GET_MY_VELOG_CONFIG = gql`
  query {
    auth {
      id
      velog_config {
        id
        title
      }
    }
  }
`;

const UPDATE_VELOG_TITLE = gql`
  mutation UpdateVelogTitle($title: String!) {
    update_velog_title(title: $title) {
      id
      title
    }
  }
`;

export default function useVelogConfig() {
  const { data, loading } = useQuery<{
    auth: {
      id: string;
      velog_config: {
        id: string;
        title: string | null;
      };
    };
  }>(GET_MY_VELOG_CONFIG);
  const [updateVelogTitle] = useMutation(UPDATE_VELOG_TITLE);

  const update = useCallback(
    (title: string) => {
      return updateVelogTitle({
        variables: {
          title,
        },
      });
    },
    [updateVelogTitle],
  );

  return {
    velogConfig: safe(() => data!.auth!.velog_config),
    update,
    loading,
  };
}

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useCallback } from 'react';

const UPDATE_THUMBNAIL = gql`
  mutation UpdateThumbnail($url: String) {
    update_thumbnail(url: $url) {
      id
      thumbnail
    }
  }
`;

export default function useUpdateThumbnail() {
  const [updateThumbnail] = useMutation(UPDATE_THUMBNAIL);
  const update = useCallback(
    (url: string | null) => {
      return updateThumbnail({
        variables: {
          url,
        },
      });
    },
    [updateThumbnail],
  );
  return update;
}

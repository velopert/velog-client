import gql from 'graphql-tag';

const UPDATE_THUMBNAIL = gql`
  mutation {
    UpdateThumbnail($url: String) {
      update_thumbnail(url: $url) {
        id
        thumbnail
      }
    }
  }
`;

export default function useUpdateThumbnail() {}

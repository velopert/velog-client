import { useQuery } from '@apollo/react-hooks';
import { GET_USER_TAGS, GetUserTagsResponse } from '../../../lib/graphql/tags';

export default function useUserTags(username: string) {
  const { data, loading } = useQuery<GetUserTagsResponse>(GET_USER_TAGS, {
    variables: {
      username,
    },
    fetchPolicy: 'network-only',
  });

  return {
    data: data
      ? { tags: data.userTags.tags, postsCount: data.userTags.posts_count }
      : null,
    loading,
  };
}

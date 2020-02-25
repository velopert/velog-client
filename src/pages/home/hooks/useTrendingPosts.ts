import {
  GET_TRENDING_POSTS,
  GetTrendingPostsResponse,
} from '../../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';

export default function useTrendingPosts() {
  const { data, loading } = useQuery<GetTrendingPostsResponse>(
    GET_TRENDING_POSTS,
  );

  return { data, loading };
}

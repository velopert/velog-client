import gql from 'graphql-tag';

export type Tag = {
  id: string;
  name: string;
  description: string | null;
  thumbnail: string | null;
  posts_count: number;
};

export const GET_TAGS = gql`
  query Tags($sort: String!, $cursor: ID) {
    tags(sort: $sort, cursor: $cursor) {
      id
      name
      description
      posts_count
      thumbnail
    }
  }
`;

export type GetTagsResponse = {
  tags: Tag[];
};

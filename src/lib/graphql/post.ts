import gql from 'graphql-tag';

export type Post = {
  id: string;
  title: string;
  body: string;
  thumbnail: string;
  is_markdown: boolean;
  is_temp: boolean;
  user: any;
  url_slug: string;
  likes: number;
  meta: any;
  views: number;
  is_private: boolean;
  released_at: string;
  created_at: string;
  updated_at: string;
  short_description: string;
  comments: [any];
  tags: [string];
};

export const getPostList = gql`
  {
    posts {
      id
      title
    }
  }
`;

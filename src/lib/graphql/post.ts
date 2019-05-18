import gql from 'graphql-tag';
import { User } from './user';

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
  comments_count: number;
};

// Post Type for PostList
export type PartialPost = {
  id: string;
  title: string;
  short_description: string;
  thumbnail: string;
  user: User;
  url_slug: string;
  is_private: boolean;
  released_at: string;
  tags: [string];
  comments_count: number;
};

export const GET_POST_LIST = gql`
  query Post($cursor: ID) {
    posts(cursor: $cursor) {
      id
      title
      short_description
      thumbnail
      user {
        id
        username
        profile {
          thumbnail
        }
      }
      url_slug
      released_at
      comments_count
      tags
      is_private
    }
  }
`;

export const WRITE_POST = gql`
  mutation WritePost(
    $title: String
    $body: String
    $tags: [String]
    $is_markdown: Boolean
    $is_temp: Boolean
    $url_slug: String
    $thumbnail: String
    $meta: JSON
  ) {
    writePost(
      title: $title
      body: $body
      tags: $tags
      is_markdown: $is_markdown
      is_temp: $is_temp
      url_slug: $url_slug
      thumbnail: $thumbnail
      meta: $meta
    ) {
      id
      title
      body
      thumbnail
      is_markdown
      is_temp
      user {
        id
        username
        profile {
          thumbnail
        }
      }
      url_slug
      meta
    }
  }
`;

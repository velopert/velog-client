import gql from 'graphql-tag';
import { UserProfile } from './user';

export type Series = {
  id: string;
  url_slug: string;
  name: string;
  created_at: string;
};

export const GET_SERIES_LIST = gql`
  query GetSeriesList($username: String) {
    seriesList(username: $username) {
      id
      url_slug
      name
      created_at
    }
  }
`;

export type GetSeriesListResponse = {
  seriesList: Series[];
};

export const CREATE_SERIES = gql`
  mutation CreateSeries($name: String!, $url_slug: String!) {
    createSeries(name: $name, url_slug: $url_slug) {
      id
      name
      url_slug
      created_at
    }
  }
`;

export type CreateSeriesResponse = {
  createSeries: Series;
};

export const APPEND_TO_SERIES = gql`
  mutation AppendToSeries($series_id: ID!, $post_id: ID!) {
    appendToSeries(series_id: $series_id, post_id: $post_id)
  }
`;

export type AppendToSeriesResponse = {
  appendToSeries: number;
};

export const GET_SERIES = gql`
  query Series($username: String, $url_slug: String) {
    series(username: $username, url_slug: $url_slug) {
      id
      name
      user {
        id
        username
        profile {
          id
          display_name
          short_bio
          thumbnail
          profile_links
        }
      }
      series_posts {
        id
        index
        post {
          id
          title
          thumbnail
          short_description
          url_slug
          released_at
        }
      }
    }
  }
`;

export const EDIT_SERIES = gql`
  mutation EditSeries($id: String, $name: String, $series_order: [ID]) {
    editSeries(id: $id, name: $name, series_order: $series_order) {
      id
      name
      user {
        id
        username
        profile {
          id
          display_name
          short_bio
          thumbnail
          profile_links
        }
      }
      series_posts {
        id
        index
        post {
          id
          title
          thumbnail
          short_description
          url_slug
          released_at
        }
      }
    }
  }
`;

export interface GetSeriesResponse {
  series: SeriesDetail;
}

export interface SeriesDetail {
  id: string;
  name: string;
  user: {
    id: string;
    username: string;
    profile: UserProfile;
  };
  series_posts: SeriesPostPreview[];
}

export interface SeriesPostPreview {
  id: string;
  post: {
    id: string;
    title: string;
    thumbnail: string;
    short_description: string;
    url_slug: string;
    released_at: string;
  };
}

export type EditSeriesResponse = GetSeriesResponse;

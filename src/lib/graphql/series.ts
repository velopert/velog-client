import gql from 'graphql-tag';

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

/*
query {
  auth {
		id
    series_list {
      id
      name
      url_slug
    }
  }
}
*/

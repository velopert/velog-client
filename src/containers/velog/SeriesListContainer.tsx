import React from 'react';
import SeriesList, {
  SeriesListSkeleton,
} from '../../components/velog/SeriesList';
import { useQuery } from '@apollo/react-hooks';
import {
  GET_USER_SERIES_LIST,
  GetUserSeriesListResponse,
} from '../../lib/graphql/user';

export interface SeriesListContainerProps {
  username: string;
}

const SeriesListContainer: React.FC<SeriesListContainerProps> = ({
  username,
}) => {
  const { data, loading, error } = useQuery<GetUserSeriesListResponse>(
    GET_USER_SERIES_LIST,
    {
      variables: {
        username,
      },
    },
  );

  if (error) {
    console.log(error);
    return null;
  }

  if (loading || !data || !data.user) return <SeriesListSkeleton />;
  return <SeriesList list={data.user.series_list} username={username} />;
};

export default SeriesListContainer;

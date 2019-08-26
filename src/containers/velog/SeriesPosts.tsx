import React from 'react';
import SeriesPostsTemplate from '../../components/velog/SeriesPostsTemplate';
import SeriesSorterAligner from '../../components/velog/SeriesSorterAligner';
import SorterButton from '../../components/common/SorterButton';
import SeriesPostList from '../../components/velog/SeriesPostList';
import { useQuery } from '@apollo/react-hooks';
import { GetSeriesResponse, GET_SERIES } from '../../lib/graphql/series';
import useToggle from '../../lib/hooks/useToggle';

export interface SeriesPostsProps {
  username: string;
  urlSlug: string;
}

const SeriesPosts: React.FC<SeriesPostsProps> = ({ username, urlSlug }) => {
  const [asc, toggle] = useToggle(true);
  const { data, loading, error } = useQuery<GetSeriesResponse>(GET_SERIES, {
    variables: {
      username,
      url_slug: urlSlug,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (!data || !data.series) return null;

  return (
    <SeriesPostsTemplate name={data.series.name}>
      <SeriesSorterAligner>
        <SorterButton value={asc ? 1 : -1} onToggle={toggle} />
      </SeriesSorterAligner>
      {
        <SeriesPostList
          seriesPosts={data.series.series_posts}
          reversed={!asc}
        />
      }
    </SeriesPostsTemplate>
  );
};

export default SeriesPosts;

import React, { useCallback, useState, useEffect } from 'react';
import SeriesPostsTemplate from '../../components/velog/SeriesPostsTemplate';
import SeriesSorterAligner from '../../components/velog/SeriesSorterAligner';
import SorterButton from '../../components/common/SorterButton';
import SeriesPostList from '../../components/velog/SeriesPostList';
import { useQuery } from '@apollo/react-hooks';
import { GetSeriesResponse, GET_SERIES } from '../../lib/graphql/series';
import useToggle from '../../lib/hooks/useToggle';
import SeriesActionButtons from '../../components/velog/SeriesActionButtons';
import DraggableSeriesPostList from '../../components/velog/DraggableSeriesPostList';
import useInput from '../../lib/hooks/useInput';

export interface SeriesPostsProps {
  username: string;
  urlSlug: string;
}

const SeriesPosts: React.FC<SeriesPostsProps> = ({ username, urlSlug }) => {
  const [asc, toggleAsc] = useToggle(true);
  const [editing, toggleEditing] = useToggle(false);
  const [nextName, setNextName] = useState('');

  const { data } = useQuery<GetSeriesResponse>(GET_SERIES, {
    variables: {
      username,
      url_slug: urlSlug,
    },
    fetchPolicy: 'cache-and-network',
  });

  const onApply = useCallback(() => {
    console.log(editing);
    toggleEditing();
  }, [editing, toggleEditing]);

  useEffect(() => {
    if (!data || !data.series) return;
    setNextName(data.series.name);
  }, [data]);

  const onChangeNextName = useCallback(
    (e: React.FormEvent<HTMLHeadingElement>) => {
      setNextName(e.currentTarget.innerText);
    },
    [],
  );

  if (!data || !data.series) return null;

  return (
    <SeriesPostsTemplate
      name={data.series.name}
      nextName={nextName}
      editing={editing}
      onInput={onChangeNextName}
    >
      <SeriesActionButtons
        onEdit={toggleEditing}
        editing={editing}
        onApply={onApply}
      />
      {!editing && (
        <SeriesSorterAligner>
          <SorterButton value={asc ? 1 : -1} onToggle={toggleAsc} />
        </SeriesSorterAligner>
      )}
      {editing ? (
        <DraggableSeriesPostList seriesPosts={data.series.series_posts} />
      ) : (
        <SeriesPostList
          seriesPosts={data.series.series_posts}
          reversed={!asc}
          username={username}
        />
      )}
    </SeriesPostsTemplate>
  );
};

export default SeriesPosts;

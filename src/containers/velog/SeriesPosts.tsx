import React, { useCallback, useState, useEffect } from 'react';
import SeriesPostsTemplate from '../../components/velog/SeriesPostsTemplate';
import SeriesSorterAligner from '../../components/velog/SeriesSorterAligner';
import SorterButton from '../../components/common/SorterButton';
import SeriesPostList from '../../components/velog/SeriesPostList';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GetSeriesResponse,
  GET_SERIES,
  EDIT_SERIES,
} from '../../lib/graphql/series';
import useToggle from '../../lib/hooks/useToggle';
import SeriesActionButtons from '../../components/velog/SeriesActionButtons';
import DraggableSeriesPostList from '../../components/velog/DraggableSeriesPostList';
import useInput from '../../lib/hooks/useInput';
import useUser from '../../lib/hooks/useUser';

export interface SeriesPostsProps {
  username: string;
  urlSlug: string;
}

const SeriesPosts: React.FC<SeriesPostsProps> = ({ username, urlSlug }) => {
  const [asc, toggleAsc] = useToggle(true);
  const [editing, toggleEditing] = useToggle(false);
  const [nextName, setNextName] = useState('');
  const [order, setOrder] = useState<string[]>([]);
  const [editSeries] = useMutation(EDIT_SERIES);
  const user = useUser();
  const isOwnSeries = user && user.username === username;

  const { data } = useQuery<GetSeriesResponse>(GET_SERIES, {
    variables: {
      username,
      url_slug: urlSlug,
    },
    fetchPolicy: 'cache-and-network',
  });

  const onApply = useCallback(async () => {
    await editSeries({
      variables: {
        id: data!.series.id,
        name: nextName,
        series_order: order,
      },
    });
    toggleEditing();
  }, [data, editSeries, nextName, order, toggleEditing]);

  useEffect(() => {
    if (!data || !data.series) return;
    setNextName(data.series.name);
    setOrder(data.series.series_posts.map(sp => sp.id));
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
      {isOwnSeries && (
        <SeriesActionButtons
          onEdit={toggleEditing}
          editing={editing}
          onApply={onApply}
        />
      )}
      {!editing && (
        <SeriesSorterAligner>
          <SorterButton value={asc ? 1 : -1} onToggle={toggleAsc} />
        </SeriesSorterAligner>
      )}
      {editing ? (
        <DraggableSeriesPostList
          seriesPosts={data.series.series_posts}
          onChangeSeriesOrder={setOrder}
        />
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

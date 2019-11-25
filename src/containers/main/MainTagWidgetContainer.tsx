import React, { useMemo } from 'react';
import MainTagWidget, {
  MainTagWidgetSkeleton,
} from '../../components/main/MainTagWidget';
import { useQuery } from '@apollo/react-hooks';
import { GET_TAGS, GetTagsResponse } from '../../lib/graphql/tags';

export type MainTagWidgetContainerProps = {};

function MainTagWidgetContainer(props: MainTagWidgetContainerProps) {
  const { data } = useQuery<GetTagsResponse>(GET_TAGS, {
    variables: {
      limit: 10,
      sort: 'trending',
    },
  });

  const tags = useMemo(
    () => (data && data.tags ? data.tags.map(tag => tag.name) : null),
    [data],
  );

  if (!tags) return <MainTagWidgetSkeleton />;

  return <MainTagWidget tags={tags} />;
}

export default MainTagWidgetContainer;

import React from 'react';
import MainNoticeWidget, {
  MainNoticeWidgetSkeleton,
} from '../../components/main/MainNoticeWidget';
import { useQuery } from '@apollo/react-hooks';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';

export type MainNoticeWidgetContainerProps = {};

function MainNoticeWidgetContainer(props: MainNoticeWidgetContainerProps) {
  const { data } = useQuery<{ posts: PartialPost[] }>(GET_POST_LIST, {
    variables: {
      username: 'velog',
      limit: 6,
    },
  });

  if (!data || !data.posts) return <MainNoticeWidgetSkeleton />;

  return <MainNoticeWidget posts={data.posts} />;
}

export default MainNoticeWidgetContainer;

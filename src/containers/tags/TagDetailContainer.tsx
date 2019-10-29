import React from 'react';
import TagDetail from '../../components/tags/TagDetail';
import { useQuery } from '@apollo/react-hooks';
import { GET_TAG, GetTagResponse } from '../../lib/graphql/tags';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';

export type TagDetailContainerProps = {
  tag: string;
};

function TagDetailContainer({ tag }: TagDetailContainerProps) {
  const tagDetail = useQuery<GetTagResponse>(GET_TAG, {
    variables: {
      name: tag,
    },
  });

  if (!tagDetail.data || !tagDetail.data.tag) return null;
  return (
    <>
      <TagDetail
        name={tagDetail.data.tag.name}
        thumbnail={tagDetail.data.tag.thumbnail}
        description={tagDetail.data.tag.description}
        count={tagDetail.data.tag.posts_count}
      />
    </>
  );
}

export default TagDetailContainer;

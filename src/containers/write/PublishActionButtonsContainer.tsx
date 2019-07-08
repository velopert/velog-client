import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import PublishActionButtons from '../../components/write/PublishActionButtons';
import { closePublish, WriteMode } from '../../modules/write';
import { WRITE_POST, WritePostResponse } from '../../lib/graphql/post';
import { pick } from 'ramda';
import { escapeForUrl } from '../../lib/utils';
import { useMutation } from 'react-apollo-hooks';
import {
  AppendToSeriesResponse,
  APPEND_TO_SERIES,
} from '../../lib/graphql/series';

type PublishActionButtonsContainerProps = {};

const PublishActionButtonsContainer: React.FC<
  PublishActionButtonsContainerProps
> = () => {
  const options = useSelector((state: RootState) =>
    pick(
      [
        'mode',
        'markdown',
        'title',
        'html',
        'tags',
        'defaultDescription',
        'description',
        'isPrivate',
        'urlSlug',
        'thumbnail',
        'selectedSeries',
      ],
      state.write,
    ),
  );
  const dispatch = useDispatch();

  const onCancel = useCallback(() => {
    dispatch(closePublish());
  }, [dispatch]);

  const writePost = useMutation<WritePostResponse>(WRITE_POST);
  const appendToSeries = useMutation<AppendToSeriesResponse>(APPEND_TO_SERIES);

  const onPublish = async () => {
    const response = await writePost({
      variables: {
        title: options.title,
        body:
          options.mode === WriteMode.MARKDOWN ? options.markdown : options.html,
        tags: options.tags,
        is_markdown: options.mode === WriteMode.MARKDOWN,
        is_temp: false,
        is_private: options.isPrivate,
        url_slug: options.urlSlug || escapeForUrl(options.title),
        thumbnail: options.thumbnail,
        meta: {},
      },
    });
    if (!response.data) return;
    const { id, user, url_slug } = response.data.writePost;
    if (options.selectedSeries) {
      await appendToSeries({
        variables: {
          series_id: options.selectedSeries.id,
          post_id: id,
        },
      });
    }

    const path = `/@${user.username}/${url_slug}`;
    console.log(path);
  };

  return <PublishActionButtons onCancel={onCancel} onPublish={onPublish} />;
};

export default PublishActionButtonsContainer;

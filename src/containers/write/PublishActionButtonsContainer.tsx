import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import PublishActionButtons from '../../components/write/PublishActionButtons';
import { closePublish, WriteMode } from '../../modules/write';
import {
  WRITE_POST,
  WritePostResponse,
  EditPostResult,
  EDIT_POST,
} from '../../lib/graphql/post';
import { pick } from 'ramda';
import { escapeForUrl, safe } from '../../lib/utils';
import { useMutation } from 'react-apollo-hooks';
import useRouter from 'use-react-router';

type PublishActionButtonsContainerProps = {};

const PublishActionButtonsContainer: React.FC<
  PublishActionButtonsContainerProps
> = () => {
  const { history } = useRouter();

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
        'postId',
      ],
      state.write,
    ),
  );
  const dispatch = useDispatch();

  const onCancel = useCallback(() => {
    dispatch(closePublish());
  }, [dispatch]);

  const [writePost] = useMutation<WritePostResponse>(WRITE_POST);
  const [editPost] = useMutation<EditPostResult>(EDIT_POST);

  const variables = {
    title: options.title,
    body: options.mode === WriteMode.MARKDOWN ? options.markdown : options.html,
    tags: options.tags,
    is_markdown: options.mode === WriteMode.MARKDOWN,
    is_temp: false,
    is_private: options.isPrivate,
    url_slug: options.urlSlug || escapeForUrl(options.title),
    thumbnail: options.thumbnail,
    meta: {},
    series_id: safe(() => options.selectedSeries!.id),
  };

  const onPublish = async () => {
    const response = await writePost({
      variables: variables,
    });
    if (!response.data) return;
    const { user, url_slug } = response.data.writePost;
    history.push(`/@${user.username}/${url_slug}`);
  };

  const onEdit = async () => {
    const response = await editPost({
      variables: {
        id: options.postId,
        ...variables,
      },
    });
    if (!response.data) return;
    console.log(response.data);
    const { user, url_slug } = response.data.editPost;
    history.push(`/@${user.username}/${url_slug}`);
  };

  return (
    <PublishActionButtons
      onCancel={onCancel}
      onPublish={options.postId ? onEdit : onPublish}
      edit={!!options.postId}
    />
  );
};

export default PublishActionButtonsContainer;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { WriteMode, clearEditor, prepareEdit } from '../../modules/write';
import EditorPanesContainer from './EditorPanesContainer';
import QuillEditorContainer from './QuillEditorContainer';
import { useLocation } from 'react-router';
import qs from 'qs';
import { useQuery } from '@apollo/react-hooks';
import {
  READ_POST_FOR_EDIT,
  ReadPostForEditResponse,
} from '../../lib/graphql/post';
import { safe } from '../../lib/utils';

export type ActiveEditorProps = {};

const ActiveEditor: React.FC<ActiveEditorProps> = () => {
  const mode = useSelector((state: RootState) => state.write.mode);
  const postId = useSelector((state: RootState) => state.write.postId);

  const dispatch = useDispatch();
  const location = useLocation();

  const { id }: { id?: string } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const readPostForEdit = useQuery<ReadPostForEditResponse>(
    READ_POST_FOR_EDIT,
    {
      variables: {
        id,
      },
      skip: !!postId || !id, // skip if id is missing
    },
  );

  useEffect(() => {
    return () => {
      dispatch(clearEditor());
    };
  }, [dispatch]);

  const post = safe(() => readPostForEdit.data!.post);
  useEffect(() => {
    if (!post) return;
    dispatch(
      prepareEdit({
        id: post.id,
        title: post.title,
        body: post.body,
        tags: post.tags,
        description: post.short_description,
        urlSlug: post.url_slug,
        series: post.series,
        isPrivate: post.is_private,
        isMarkdown: post.is_markdown,
        isTemp: post.is_temp,
      }),
    );
  }, [dispatch, post]);

  if (id && !post && !postId) return null;

  return mode === WriteMode.MARKDOWN ? (
    <>
      <EditorPanesContainer />
    </>
  ) : (
    <QuillEditorContainer />
  );
};

export default ActiveEditor;

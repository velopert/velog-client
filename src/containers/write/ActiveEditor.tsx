import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../modules';
import {
  WriteMode,
  clearEditor,
  prepareEdit,
  convertEditorMode,
  setInitialBody,
  changeTitle,
  setInitialTitle,
} from '../../modules/write';
import EditorPanesContainer from './EditorPanesContainer';
// import QuillEditorContainer from './QuillEditorContainer';
import { useLocation } from 'react-router';
import qs from 'qs';
import { useQuery } from '@apollo/react-hooks';
import {
  READ_POST_FOR_EDIT,
  ReadPostForEditResponse,
  GET_LAST_POST_HISTORY,
  GetLastPostHistoryResult,
} from '../../lib/graphql/post';
import { safe } from '../../lib/utils';
import PopupOKCancel from '../../components/common/PopupOKCancel';

export type ActiveEditorProps = {};

const ActiveEditor: React.FC<ActiveEditorProps> = () => {
  const [newPost, setNewPost] = useState(false);
  const mode = useSelector((state: RootState) => state.write.mode);
  const postId = useSelector((state: RootState) => state.write.postId);
  const [askLoadTemp, setAskLoadTemp] = useState(false);
  const initialized = useRef(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const { id }: { id?: string } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (!id) {
      setNewPost(true);
    }
  }, [id]);

  const readPostForEdit = useQuery<ReadPostForEditResponse>(
    READ_POST_FOR_EDIT,
    {
      variables: {
        id,
      },
      skip: !id || newPost, // skip if id is missing
    },
  );

  const getLastPostHistory = useQuery<GetLastPostHistoryResult>(
    GET_LAST_POST_HISTORY,
    {
      variables: {
        post_id: id,
      },
      skip: !id,
      fetchPolicy: 'network-only',
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
    if (initialized.current) return;
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
        thumbnail: post.thumbnail,
      }),
    );
    dispatch(setInitialBody(post.body));
    initialized.current = true;
  }, [dispatch, post]);

  const lastPostHistory = safe(() => getLastPostHistory.data!.lastPostHistory);

  const onApplyTempSave = useCallback(() => {
    if (!lastPostHistory) return;
    dispatch(setInitialTitle(lastPostHistory.title));
    dispatch(setInitialBody(lastPostHistory.body));
    setAskLoadTemp(false);
  }, [dispatch, lastPostHistory]);

  useEffect(() => {
    if (!lastPostHistory) return;
    if (!post) return;

    const equals = shallowEqual(
      {
        title: lastPostHistory.title,
        body: lastPostHistory.body,
      },
      {
        title: post.title,
        body: post.body,
      },
    );
    if (equals) return;
    if (new Date(post.updated_at) < new Date(lastPostHistory.created_at)) {
      setAskLoadTemp(true);
    }
    // if (lastPostHistory.is_markdown !== post.is_markdown) {
    //   dispatch(convertEditorMode());
    // }

    // dispatch(changeTitle(lastPostHistory.title));
    // dispatch(setInitialBody(lastPostHistory.body));
  }, [dispatch, lastPostHistory, post]);

  if (id && !post && !postId) return null;

  return (
    <>
      <EditorPanesContainer />
      <PopupOKCancel
        visible={askLoadTemp}
        title="임시 포스트 불러오기"
        onCancel={() => setAskLoadTemp(false)}
        onConfirm={onApplyTempSave}
      >
        임시저장된 포스트를 불러오시겠습니까?
      </PopupOKCancel>
    </>
  );

  // return mode === WriteMode.MARKDOWN ? (
  //   <></>
  // ) : <QuillEditorContainer />
};

export default ActiveEditor;

import React, { useMemo, useState } from 'react';
import MarkdownEditor from '../../components/write/WriteMarkdownEditor';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../modules';
import {
  changeMarkdown,
  changeTitle,
  setHtml,
  convertEditorMode,
  openPublish,
  setDefaultDescription,
  setThumbnail,
  setWritePostId,
  setInitialBody,
} from '../../modules/write';

import remark from 'remark';
import htmlPlugin from 'remark-html';
import breaks from 'remark-breaks';
import strip from 'strip-markdown';
import TagInputContainer from './TagInputContainer';
import WriteFooter from '../../components/write/WriteFooter';
import useUpload from '../../lib/hooks/useUpload';
import useS3Upload from '../../lib/hooks/useS3Upload';
import DragDropUpload from '../../components/common/DragDropUpload';
import PasteUpload from '../../components/common/PasteUpload';
import { bindActionCreators } from 'redux';
import { useMutation } from '@apollo/react-hooks';
import {
  WritePostResponse,
  WRITE_POST,
  CreatePostHistoryResponse,
  CREATE_POST_HISTORY,
} from '../../lib/graphql/post';
import { openPopup } from '../../modules/core';
import { escapeForUrl } from '../../lib/utils';
import { useHistory } from 'react-router';
import useSaveHotKey from './hooks/useSaveHotkey';

export type MarkdownEditorContainerProps = {};

const { useCallback, useEffect } = React;

const MarkdownEditorContainer: React.FC<MarkdownEditorContainerProps> = () => {
  const history = useHistory();
  const {
    title,
    markdown,
    thumbnail,
    publish,
    postId,
    isTemp,
    initialBody,
  } = useSelector((state: RootState) => state.write);
  const [writePost] = useMutation<WritePostResponse>(WRITE_POST);
  const [createPostHistory] = useMutation<CreatePostHistoryResponse>(
    CREATE_POST_HISTORY,
  );
  const [lastSavedData, setLastSavedData] = useState({
    title: '',
    body: '',
  });

  const dispatch = useDispatch();
  const actionCreators = useMemo(
    () =>
      bindActionCreators(
        {
          changeMarkdown,
          changeTitle,
          setHtml,
          convertEditorMode,
          openPublish,
          setDefaultDescription,
          setThumbnail,
          setInitialBody,
        },
        dispatch,
      ),
    [dispatch],
  );

  const onConvert = (markdown: string) => {
    remark()
      .use(breaks)
      .use(htmlPlugin)
      .process(markdown, (err: any, file: any) => {
        const html = String(file);
        actionCreators.setHtml(html);
        actionCreators.setInitialBody(html);
        actionCreators.convertEditorMode();
      });
  };

  const onPublish = useCallback(() => {
    // (/#(.*?)\n/g, '').replace(/\n/g, '')
    remark()
      .use(strip)
      .process(markdown.replace(/#(.*?)\n/g, ''), (err: any, file: any) => {
        const text = String(file);
        const sliced = text.replace(/\n/g, '').slice(0, 150);
        actionCreators.setDefaultDescription(sliced);
        actionCreators.openPublish();
      });
  }, [actionCreators, markdown]);

  const [upload, file] = useUpload();
  const [s3Upload, image] = useS3Upload();

  useEffect(() => {
    if (!file) return;
    s3Upload(file, {
      type: 'post',
    });
  }, [file, s3Upload]);

  useEffect(() => {
    if (!thumbnail && image) {
      actionCreators.setThumbnail(image);
    }
  }, [actionCreators, image, thumbnail]);

  const onDragDropUpload = useCallback(
    (file: File) => {
      s3Upload(file, {
        type: 'post',
      });
    },
    [s3Upload],
  );

  const onTempSave = useCallback(async () => {
    if (!title || !markdown) {
      dispatch(
        openPopup({
          title: '임시저장 실패',
          message: '제목 또는 내용이 비어있습니다.',
        }),
      );
      return;
    }

    if (!postId) {
      const response = await writePost({
        variables: {
          title,
          body: markdown,
          tags: [],
          is_markdown: true,
          is_temp: true,
          is_private: false,
          url_slug: escapeForUrl(title),
          thumbnail: null,
          meta: {},
          series_id: null,
        },
      });
      if (!response || !response.data) return;
      const { id } = response.data.writePost;
      dispatch(setWritePostId(id));
      history.replace(`/write?id=${id}`);
    } else {
      // save only if something has been changed
      if (shallowEqual(lastSavedData, { title, body: markdown })) return;
      await createPostHistory({
        variables: {
          post_id: postId,
          title,
          body: markdown,
          is_markdown: true,
        },
      });
      setLastSavedData({
        title,
        body: markdown,
      });
    }
  }, [
    createPostHistory,
    dispatch,
    history,
    lastSavedData,
    markdown,
    postId,
    title,
    writePost,
  ]);

  useEffect(() => {
    const changed = !shallowEqual(lastSavedData, { title, body: markdown });
    if (changed) {
      const timeoutId = setTimeout(() => {
        if (!postId) return;
        onTempSave();
      }, 10 * 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [title, postId, onTempSave, lastSavedData, markdown]);

  useSaveHotKey(onTempSave);

  return (
    <>
      <MarkdownEditor
        onUpload={upload}
        lastUploadedImage={publish ? null : image}
        initialBody={initialBody}
        title={title}
        markdown={markdown}
        onChangeMarkdown={actionCreators.changeMarkdown}
        onChangeTitle={actionCreators.changeTitle}
        onConvert={onConvert}
        tagInput={<TagInputContainer />}
        footer={
          <WriteFooter
            onPublish={onPublish}
            onTempSave={onTempSave}
            edit={!!postId && !isTemp}
          />
        }
      />
      <DragDropUpload onUpload={onDragDropUpload} />
      <PasteUpload onUpload={onDragDropUpload} />
    </>
  );
};

export default MarkdownEditorContainer;

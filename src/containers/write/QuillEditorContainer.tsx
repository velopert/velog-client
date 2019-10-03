import React, { useMemo, useState } from 'react';
import { batch, useSelector, useDispatch, shallowEqual } from 'react-redux';
import QuillEditor from '../../components/write/QuillEditor';
import { RootState } from '../../modules';
import {
  convertEditorMode,
  changeTitle,
  changeMarkdown,
  openPublish,
  setHtml,
  setTextBody,
  setDefaultDescription,
  setThumbnail,
  setWritePostId,
} from '../../modules/write';
import TagInputContainer from './TagInputContainer';
import WriteFooter from '../../components/write/WriteFooter';
import useUpload from '../../lib/hooks/useUpload';
import useS3Upload from '../../lib/hooks/useS3Upload';
import DragDropUpload from '../../components/common/DragDropUpload';
import PasteUpload from '../../components/common/PasteUpload';
import { bindActionCreators } from 'redux';
import { openPopup } from '../../modules/core';
import { useMutation } from '@apollo/react-hooks';
import {
  WritePostResponse,
  WRITE_POST,
  CreatePostHistoryResponse,
  CREATE_POST_HISTORY,
} from '../../lib/graphql/post';
import { escapeForUrl } from '../../lib/utils';
import { postActions } from '../../modules/post';

export type QuillEditorContainerProps = {};

const { useCallback, useEffect } = React;

const QuillEditorContainer: React.FC<QuillEditorContainerProps> = () => {
  const {
    title,
    html,
    textBody,
    thumbnail,
    publish,
    postId,
    isTemp,
  } = useSelector(({ write }: RootState) => write, shallowEqual);
  const dispatch = useDispatch();
  const actionCreators = useMemo(
    () =>
      bindActionCreators(
        {
          convertEditorMode,
          changeTitle,
          changeMarkdown,
          openPublish,
          setHtml,
          setTextBody,
          setDefaultDescription,
          setThumbnail,
        },
        dispatch,
      ),
    [dispatch],
  );
  const [writePost] = useMutation<WritePostResponse>(WRITE_POST);
  const [createPostHistory] = useMutation<CreatePostHistoryResponse>(
    CREATE_POST_HISTORY,
  );
  const [lastSavedData, setLastSavedData] = useState({
    title: '',
    body: '',
  });

  const onConvertEditorMode = (markdown: string) => {
    batch(() => {
      actionCreators.changeMarkdown(markdown);
      actionCreators.convertEditorMode();
    });
  }; // after transition
  const onChangeTitle = (title: string) => actionCreators.changeTitle(title);
  const onChangeHtml = (html: string) => actionCreators.setHtml(html);
  const onChangeTextBody = (textBody: string) =>
    actionCreators.setTextBody(textBody);

  const onPublish = useCallback(() => {
    // window.document.body.style.overflowX = 'hidden';
    // window.document.body.style.overflowY = 'hidden';
    actionCreators.openPublish();
    actionCreators.setDefaultDescription(
      textBody.replace(/\n/g, '').slice(0, 150),
    );
  }, [actionCreators, textBody]);

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

  const onTempSave = async () => {
    if (!title || !html) {
      dispatch(
        openPopup({
          title: '임시저장 실패',
          message: '제목 또는 내용이 비어있습니다.',
        }),
      );
      return;
    }

    if (!postId) {
      // make writePost mutation
      const response = await writePost({
        variables: {
          title,
          body: html,
          tags: [],
          is_markdown: false,
          is_temp: true,
          is_private: false,
          url_slug: escapeForUrl(title),
          thumbnail: null,
          meta: {},
          series_id: null,
        },
      });
      if (!response || !response.data) return;
      dispatch(setWritePostId(response.data.writePost.id));
    } else {
      // save only if something has been changed
      if (shallowEqual(lastSavedData, { title, body: html })) return;
      // create history
      await createPostHistory({
        variables: {
          post_id: postId,
          title,
          body: html,
          is_markdown: false,
        },
      });
      setLastSavedData({
        title,
        body: html,
      });
    }
  };

  return (
    <>
      <QuillEditor
        title={title}
        onConvertEditorMode={onConvertEditorMode}
        onChangeTitle={onChangeTitle}
        initialHtml={html}
        tagInput={<TagInputContainer />}
        onChangeHtml={onChangeHtml}
        onChangeTextBody={onChangeTextBody}
        footer={
          <WriteFooter
            onPublish={onPublish}
            onTempSave={onTempSave}
            edit={!!postId && !isTemp}
          />
        }
        onUpload={upload}
        lastUploadedImage={publish ? null : image}
      />
      <DragDropUpload onUpload={onDragDropUpload} />
      <PasteUpload onUpload={onDragDropUpload} />
    </>
  );
};

export default QuillEditorContainer;

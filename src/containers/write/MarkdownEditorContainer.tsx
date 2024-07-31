import React, { useMemo, useRef, useState } from 'react';
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
import DragDropUpload from '../../components/common/DragDropUpload';
import PasteUpload from '../../components/common/PasteUpload';
import { bindActionCreators } from 'redux';
import { useMutation } from '@apollo/react-hooks';
import {
  WritePostResponse,
  WRITE_POST,
  CreatePostHistoryResponse,
  CREATE_POST_HISTORY,
  EditPostResult,
  EDIT_POST,
} from '../../lib/graphql/post';
import { escapeForUrl } from '../../lib/utils';
import { useHistory } from 'react-router';
import useSaveHotKey from './hooks/useSaveHotkey';
import embedPlugin from '../../lib/remark/embedPlugin';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { usePrevious } from 'react-use';
import { useTheme } from '../../lib/hooks/useTheme';
import { useUncachedApolloClient } from '../../lib/graphql/UncachedApolloContext';
import { useCFUpload } from '../../lib/hooks/useCFUpload';

export type MarkdownEditorContainerProps = {};

const { useCallback, useEffect } = React;

const MarkdownEditorContainer: React.FC<MarkdownEditorContainerProps> = () => {
  const history = useHistory();
  const {
    title,
    markdown,
    thumbnail,
    postId,
    isTemp,
    initialBody,
    initialTitle,
    tags,
  } = useSelector((state: RootState) => state.write);
  const uncachedClient = useUncachedApolloClient();
  const [writePost, { loading: writePostLoading }] =
    useMutation<WritePostResponse>(WRITE_POST, {
      client: uncachedClient,
    });

  const bodyRef = useRef(initialBody);
  const titleRef = useRef(title);
  const [createPostHistory] =
    useMutation<CreatePostHistoryResponse>(CREATE_POST_HISTORY);
  const [editPost, { loading: editPostLoading }] = useMutation<EditPostResult>(
    EDIT_POST,
    {
      client: uncachedClient,
    },
  );

  const [lastSavedData, setLastSavedData] = useState({
    title: initialTitle,
    body: initialBody,
  });

  const onGoBack = () => {
    history.goBack();
  };

  useEffect(() => {
    setLastSavedData({
      title: initialTitle,
      body: initialBody,
    });
  }, [initialTitle, initialBody]);

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
      .use(embedPlugin)
      .process(markdown, (err: any, file: any) => {
        const html = String(file);
        console.log(html);
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

  const { upload: cfUpload, image } = useCFUpload();
  const prevImage = usePrevious(image);
  const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image !== prevImage && !thumbnail && image) {
      actionCreators.setThumbnail(image);
    }
  }, [actionCreators, image, prevImage, thumbnail]);

  const onTempSave = useCallback(
    async (notify?: boolean) => {
      if (writePostLoading || editPostLoading) return;
      if (!title || !markdown) {
        toast.error('제목 또는 내용이 비어있습니다.');
        return;
      }

      const notifySuccess = () => {
        if (!notify) return;
        toast.success('포스트가 임시저장되었습니다.');
      };

      if (!postId) {
        const response = await writePost({
          variables: {
            title,
            body: markdown,
            tags,
            is_markdown: true,
            is_temp: true,
            is_private: false,
            url_slug: escapeForUrl(title),
            thumbnail: null,
            meta: {},
            series_id: null,
            token: null,
          },
        });

        if (!response.data?.writePost) return;
        const { id } = response.data.writePost;
        dispatch(setWritePostId(id));
        history.replace(`/write?id=${id}`);
        notifySuccess();
      }

      // tempsaving unreleased post:
      if (isTemp && postId) {
        setLastSavedData({
          title,
          body: markdown,
        });
        await editPost({
          variables: {
            id: postId,
            title,
            body: markdown,
            is_markdown: true,
            is_temp: true,
            is_private: false,
            url_slug: escapeForUrl(title),
            thumbnail: null,
            meta: {},
            series_id: null,
            tags,
            token: null,
          },
        });
        notifySuccess();
        return;
      }

      // tempsaving released post:
      // save only if something has been changed
      if (shallowEqual(lastSavedData, { title, body: markdown })) {
        return;
      }

      if (postId) {
        await createPostHistory({
          variables: {
            post_id: postId,
            title,
            body: markdown,
            is_markdown: true,
          },
        });
      }

      setLastSavedData({
        title,
        body: markdown,
      });
    },
    [
      createPostHistory,
      dispatch,
      editPost,
      history,
      isTemp,
      lastSavedData,
      markdown,
      postId,
      tags,
      title,
      writePost,
      writePostLoading,
      editPostLoading,
    ],
  );

  const postIdRef = useRef(postId);
  useEffect(() => {
    postIdRef.current = postId;
  }, [postId]);

  const uploadWithPostId = useCallback(
    async (file: File) => {
      if (!file) return;
      let id = postIdRef.current;
      if (!id) {
        const title = titleRef.current || 'Temp Title';
        const body = bodyRef.current || 'Temp Body';

        const response = await writePost({
          variables: {
            title,
            body,
            tags: [],
            is_markdown: true,
            is_temp: true,
            is_private: false,
            url_slug: escapeForUrl(title),
            thumbnail: null,
            meta: {},
            series_id: null,
            token: null,
          },
        });

        if (!response.data?.writePost) return;
        id = response.data.writePost.id;
        dispatch(setWritePostId(id));
        history.replace(`/write?id=${id}`);
      }
      if (!id) return;

      const url = URL.createObjectURL(file);
      setImageBlobUrl(url);

      cfUpload(file, { type: 'post', refId: id }).catch((e) => {
        toast.error('이미지 업로드 실패! 잠시 후 다시 시도하세요.');
      });
    },
    [cfUpload, writePost, dispatch, history],
  );

  const onDragDropUpload = useCallback(
    (file: File) => {
      uploadWithPostId(file);
    },
    [uploadWithPostId],
  );

  useEffect(() => {
    if (!file) return;
    uploadWithPostId(file);
  }, [file, uploadWithPostId]);

  useEffect(() => {
    const changed = !shallowEqual(lastSavedData, { title, body: markdown });
    if (changed) {
      const timeoutId = setTimeout(() => {
        if (!postId && !title && markdown.length < 30) return;
        onTempSave(true);
      }, 10 * 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [title, postId, onTempSave, lastSavedData, markdown]);

  useSaveHotKey(() => onTempSave(true));

  const isReady = useSelector(
    (state: RootState) => state.darkMode.systemTheme !== 'not-ready',
  );
  const theme = useTheme();

  useEffect(() => {
    bodyRef.current = markdown;
    titleRef.current = title;
  }, [markdown, title]);

  if (!isReady) return null;

  return (
    <>
      <Helmet>
        <title>{title ? `(작성중) ${title}` : '새 글 작성'}</title>
      </Helmet>
      <MarkdownEditor
        onUpload={upload}
        tempBlobImage={imageBlobUrl}
        lastUploadedImage={image}
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
            onGoBack={onGoBack}
            edit={!!postId && !isTemp}
          />
        }
        theme={theme}
      />
      <DragDropUpload onUpload={onDragDropUpload} />
      <PasteUpload onUpload={onDragDropUpload} />
    </>
  );
};

export default MarkdownEditorContainer;

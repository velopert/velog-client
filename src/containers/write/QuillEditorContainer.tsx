import React, { useMemo } from 'react';
import { batch, useSelector, useDispatch } from 'react-redux';
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
} from '../../modules/write';
import TagInputContainer from './TagInputContainer';
import WriteFooter from '../../components/write/WriteFooter';
import useUpload from '../../lib/hooks/useUpload';
import useS3Upload from '../../lib/hooks/useS3Upload';
import DragDropUpload from '../../components/common/DragDropUpload';
import PasteUpload from '../../components/common/PasteUpload';
import { bindActionCreators } from 'redux';

export type QuillEditorContainerProps = {};

const { useCallback, useEffect } = React;

const QuillEditorContainer: React.FC<QuillEditorContainerProps> = () => {
  const { title, html, textBody, thumbnail, publish, postId } = useSelector(
    ({ write }: RootState) => ({
      mode: write.mode,
      title: write.title,
      html: write.html,
      textBody: write.textBody,
      thumbnail: write.thumbnail,
      publish: write.publish,
      postId: write.postId,
    }),
  );
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
            onTempSave={() => {}}
            edit={!!postId}
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

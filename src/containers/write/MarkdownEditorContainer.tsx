import React, { useMemo } from 'react';
import MarkdownEditor from '../../components/write/MarkdownEditor';
import { connect, useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {
  changeMarkdown,
  changeTitle,
  setHtml,
  convertEditorMode,
  openPublish,
  setDefaultDescription,
  setThumbnail,
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

export type MarkdownEditorContainerProps = {};

const { useCallback, useEffect } = React;

const MarkdownEditorContainer: React.SFC<MarkdownEditorContainerProps> = () => {
  const { title, markdown, thumbnail, publish, postId } = useSelector(
    (state: RootState) => ({
      title: state.write.title,
      markdown: state.write.markdown,
      thumbnail: state.write.thumbnail,
      publish: state.write.publish,
      postId: state.write.postId,
    }),
  );
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
  return (
    <>
      <MarkdownEditor
        onUpload={upload}
        lastUploadedImage={publish ? null : image}
        title={title}
        markdown={markdown}
        onChangeMarkdown={actionCreators.changeMarkdown}
        onChangeTitle={actionCreators.changeTitle}
        onConvert={onConvert}
        tagInput={<TagInputContainer />}
        footer={
          <WriteFooter
            onPublish={onPublish}
            onTempSave={() => {}}
            edit={!!postId}
          />
        }
      />
      <DragDropUpload onUpload={onDragDropUpload} />
      <PasteUpload onUpload={onDragDropUpload} />
    </>
  );
};

export default MarkdownEditorContainer;

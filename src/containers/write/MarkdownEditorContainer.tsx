import * as React from 'react';
import MarkdownEditor from '../../components/write/MarkdownEditor';
import { connect } from 'react-redux';
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

interface OwnProps {}
interface StateProps {
  title: string;
  markdown: string;
  thumbnail: null | string;
}
interface DispatchProps {
  changeMarkdown: typeof changeMarkdown;
  changeTitle: typeof changeTitle;
  setHtml: typeof setHtml;
  convertEditorMode: typeof convertEditorMode;
  openPublish: typeof openPublish;
  setDefaultDescription: typeof setDefaultDescription;
  setThumbnail: typeof setThumbnail;
}

export type MarkdownEditorContainerProps = OwnProps &
  StateProps &
  DispatchProps;

const { useCallback, useEffect } = React;

const MarkdownEditorContainer: React.SFC<MarkdownEditorContainerProps> = ({
  changeMarkdown,
  changeTitle,
  setHtml,
  convertEditorMode,
  title,
  markdown,
  thumbnail,
  openPublish,
  setDefaultDescription,
}) => {
  const onConvert = (markdown: string) => {
    remark()
      .use(breaks)
      .use(htmlPlugin)
      .process(markdown, (err: any, file: any) => {
        const html = String(file);
        setHtml(html);
        convertEditorMode();
      });
  };

  const onPublish = useCallback(() => {
    // (/#(.*?)\n/g, '').replace(/\n/g, '')
    remark()
      .use(strip)
      .process(markdown.replace(/#(.*?)\n/g, ''), (err: any, file: any) => {
        const text = String(file);
        const sliced = text.replace(/\n/g, '').slice(0, 150);
        setDefaultDescription(sliced);
        openPublish();
      });
  }, [markdown, openPublish, setDefaultDescription]);

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
      setThumbnail(image);
    }
  }, [image, thumbnail]);

  return (
    <MarkdownEditor
      onUpload={upload}
      lastUploadedImage={image}
      title={title}
      markdown={markdown}
      onChangeMarkdown={changeMarkdown}
      onChangeTitle={changeTitle}
      onConvert={onConvert}
      tagInput={<TagInputContainer />}
      footer={<WriteFooter onPublish={onPublish} onTempSave={() => {}} />}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    title: state.write.title,
    markdown: state.write.markdown,
    thumbnail: state.write.thumbnail,
  }),
  {
    changeMarkdown,
    changeTitle,
    setHtml,
    convertEditorMode,
    openPublish,
    setDefaultDescription,
    setThumbnail,
  },
)(MarkdownEditorContainer);

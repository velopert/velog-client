import * as React from 'react';
import { connect, batch } from 'react-redux';
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
} from '../../modules/write';
import TagInputContainer from './TagInputContainer';
import WriteFooter from '../../components/write/WriteFooter';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type QuillEditorContainerProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = ({ write }: RootState) => ({
  mode: write.mode,
  title: write.title,
  html: write.html,
  textBody: write.textBody,
});
const mapDispatchToProps = {
  convertEditorMode,
  changeTitle,
  changeMarkdown,
  openPublish,
  setHtml,
  setTextBody,
  setDefaultDescription,
};

const { useCallback } = React;

const QuillEditorContainer: React.FC<QuillEditorContainerProps> = ({
  title,
  changeMarkdown,
  convertEditorMode,
  changeTitle,
  openPublish,
  html,
  setHtml,
  setTextBody,
  setDefaultDescription,
  textBody,
}) => {
  const onConvertEditorMode = (markdown: string) => {
    batch(() => {
      changeMarkdown(markdown);
      convertEditorMode();
    });
  }; // after transition
  const onChangeTitle = (title: string) => changeTitle(title);
  const onChangeHtml = (html: string) => setHtml(html);
  const onChangeTextBody = (textBody: string) => setTextBody(textBody);

  const onPublish = useCallback(() => {
    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'hidden';
    openPublish();
    setDefaultDescription(textBody.replace(/\n/g, '').slice(0, 150));
  }, [openPublish, setDefaultDescription, textBody]);
  return (
    <QuillEditor
      title={title}
      onConvertEditorMode={onConvertEditorMode}
      onChangeTitle={onChangeTitle}
      initialHtml={html}
      tagInput={<TagInputContainer />}
      onChangeHtml={onChangeHtml}
      onChangeTextBody={onChangeTextBody}
      footer={<WriteFooter onPublish={onPublish} onTempSave={() => {}} />}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(QuillEditorContainer);

import * as React from 'react';
import MarkdownEditor from '../../components/write/MarkdownEditor';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { changeMarkdown, changeTitle } from '../../modules/write';

interface OwnProps {}
interface StateProps {
  title: string;
  markdown: string;
}
interface DispatchProps {
  changeMarkdown: typeof changeMarkdown;
  changeTitle: typeof changeTitle;
}
type MarkdownEditorContainerProps = OwnProps & StateProps & DispatchProps;

const MarkdownEditorContainer: React.SFC<MarkdownEditorContainerProps> = ({
  changeMarkdown,
  changeTitle,
  title,
  markdown,
}) => {
  return (
    <MarkdownEditor
      title={title}
      markdown={markdown}
      onChangeMarkdown={changeMarkdown}
      onChangeTitle={changeTitle}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    title: state.write.title,
    markdown: state.write.markdown,
  }),
  {
    changeMarkdown,
    changeTitle,
  },
)(MarkdownEditorContainer);

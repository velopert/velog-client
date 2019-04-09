import * as React from 'react';
import MarkdownEditor from '../../components/write/MarkdownEditor';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { changeMarkdown } from '../../modules/write';

interface OwnProps {}
interface StateProps {}
interface DispatchProps {
  changeMarkdown: typeof changeMarkdown;
}
type MarkdownEditorContainerProps = OwnProps & StateProps & DispatchProps;

const MarkdownEditorContainer: React.SFC<MarkdownEditorContainerProps> = ({
  changeMarkdown,
}) => {
  return <MarkdownEditor onChangeMarkdown={changeMarkdown} />;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({}),
  {
    changeMarkdown,
  },
)(MarkdownEditorContainer);

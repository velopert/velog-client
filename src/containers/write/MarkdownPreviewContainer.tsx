import * as React from 'react';
import MarkdownPreview from '../../components/write/MarkdownPreview';
import { connect } from 'react-redux';
import { RootState } from '../../modules';

interface OwnProps {}
interface StateProps {
  markdown: string;
}
interface DispatchProps {}
type MarkdownPreviewContainerProps = OwnProps & StateProps & DispatchProps;

const MarkdownPreviewContainer: React.SFC<MarkdownPreviewContainerProps> = ({
  markdown,
}) => {
  return <MarkdownPreview markdown={markdown} />;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ write }) => ({
    markdown: write.markdown,
  }),
  dispatch => ({}),
)(MarkdownPreviewContainer);

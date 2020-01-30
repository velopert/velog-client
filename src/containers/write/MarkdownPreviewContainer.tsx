import * as React from 'react';
import MarkdownPreview from '../../components/write/MarkdownPreview';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import styled from 'styled-components';

interface OwnProps {}
interface StateProps {
  markdown: string;
  title: string;
}
interface DispatchProps {}
type MarkdownPreviewContainerProps = OwnProps & StateProps & DispatchProps;

const MarkdownPreviewContainer: React.FC<MarkdownPreviewContainerProps> = ({
  markdown,
  title,
}) => {
  return <MarkdownPreview markdown={markdown} title={title} />;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ write }) => ({
    markdown: write.markdown,
    title: write.title,
  }),
  dispatch => ({}),
)(MarkdownPreviewContainer);

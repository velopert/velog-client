import * as React from 'react';
import { connect } from 'react-redux';
import QuillEditor from '../../components/write/QuillEditor';
import { RootState } from '../../modules';
import { convertEditorMode } from '../../modules/write';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type QuillEditorContainerProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = ({ write }: RootState) => ({ mode: write.mode });
const mapDispatchToProps = {
  convertEditorMode,
};

const QuillEditorContainer: React.FC<QuillEditorContainerProps> = ({
  mode,
  convertEditorMode,
}) => {
  const onConvertEditorMode = () => setTimeout(() => convertEditorMode(), 200); // after transition
  return <QuillEditor onConvertEditorMode={onConvertEditorMode} />;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(QuillEditorContainer);

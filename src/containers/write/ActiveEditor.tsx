import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import { WriteMode } from '../../modules/write';
import EditorPanesContainer from './EditorPanesContainer';
import QuillEditorContainer from './QuillEditorContainer';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type ActiveEditorProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = ({ write }: RootState) => ({
  mode: write.mode,
});
const mapDispatchToProps = {};

const ActiveEditor: React.FC<ActiveEditorProps> = ({ mode }) => {
  return mode === WriteMode.MARKDOWN ? (
    <EditorPanesContainer />
  ) : (
    <QuillEditorContainer />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveEditor);

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { WriteMode, clearEditor } from '../../modules/write';
import EditorPanesContainer from './EditorPanesContainer';
import QuillEditorContainer from './QuillEditorContainer';

type ActiveEditorProps = {};

const ActiveEditor: React.FC<ActiveEditorProps> = () => {
  const mode = useSelector((state: RootState) => state.write.mode);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(clearEditor());
    };
  }, [dispatch]);

  return mode === WriteMode.MARKDOWN ? (
    <>
      <EditorPanesContainer />
    </>
  ) : (
    <QuillEditorContainer />
  );
};

export default ActiveEditor;

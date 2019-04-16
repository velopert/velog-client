import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../lib/utils';

const CHANGE_MARKDOWN = 'write/CHANGE_MARKDOWN';
const CHANGE_TITLE = 'write/CHANGE_TITLE';
const CONVERT_EDITOR_MODE = 'write/CONVERT_EDITOR_MODE';

export const changeMarkdown = createStandardAction(CHANGE_MARKDOWN)<string>();
export const changeTitle = createStandardAction(CHANGE_TITLE)<string>();
export const convertEditorMode = createStandardAction(CONVERT_EDITOR_MODE)();

type ChangeMarkdown = ReturnType<typeof changeMarkdown>;
type ChangeTitle = ReturnType<typeof changeTitle>;

export type WriteState = {
  mode: 'MARKDOWN' | 'WYSIWYG';
  markdown: string;
  title: string;
};

const initialState: WriteState = {
  mode: 'WYSIWYG',
  markdown: '',
  title: '',
};

const write = createReducer(
  {
    [CHANGE_MARKDOWN]: (state, action: ChangeMarkdown) => ({
      ...state,
      markdown: action.payload,
    }),
    [CHANGE_TITLE]: (state, action: ChangeTitle) => ({
      ...state,
      title: action.payload,
    }),
    [CONVERT_EDITOR_MODE]: state => ({
      ...state,
      mode: (state.mode === 'MARKDOWN' ? 'WYSIWYG' : 'MARKDOWN') as
        | 'MARKDOWN'
        | 'WYSIWYG',
    }),
  },
  initialState,
);

export default write;

import { createStandardAction } from 'typesafe-actions';
import { createReducer, updateKey } from '../lib/utils';

const CHANGE_MARKDOWN = 'write/CHANGE_MARKDOWN';
const CHANGE_TITLE = 'write/CHANGE_TITLE';
const CONVERT_EDITOR_MODE = 'write/CONVERT_EDITOR_MODE';
const SET_HTML = 'write/SET_HTML';

export const changeMarkdown = createStandardAction(CHANGE_MARKDOWN)<string>();
export const changeTitle = createStandardAction(CHANGE_TITLE)<string>();
export const convertEditorMode = createStandardAction(CONVERT_EDITOR_MODE)();
export const setHtml = createStandardAction(SET_HTML)<string>();

type ChangeMarkdown = ReturnType<typeof changeMarkdown>;
type ChangeTitle = ReturnType<typeof changeTitle>;
type SetHtml = ReturnType<typeof setHtml>;

export enum WriteMode {
  MARKDOWN = 'MARKDOWN',
  WYSIWYG = 'WYSIWYG',
}

export type WriteState = {
  mode: WriteMode;
  markdown: string;
  title: string;
  html: string;
};

const initialState: WriteState = {
  mode: WriteMode.WYSIWYG,
  markdown: '',
  title: '',
  html: '',
};

const write = createReducer(
  {
    [CHANGE_MARKDOWN]: (state, action: ChangeMarkdown) =>
      updateKey(state, 'markdown', action.payload),
    [CHANGE_TITLE]: (state, action: ChangeTitle) =>
      updateKey(state, 'title', action.payload),
    [CONVERT_EDITOR_MODE]: state =>
      updateKey(
        state,
        'mode',
        state.mode === WriteMode.MARKDOWN
          ? WriteMode.WYSIWYG
          : WriteMode.MARKDOWN,
      ),
    [SET_HTML]: (state, action: SetHtml) =>
      updateKey(state, 'html', action.payload),
  },
  initialState,
);

export default write;

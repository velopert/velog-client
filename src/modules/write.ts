import { createStandardAction } from 'typesafe-actions';
import { createReducer, updateKey } from '../lib/utils';

const CHANGE_MARKDOWN = 'write/CHANGE_MARKDOWN';
const CHANGE_TITLE = 'write/CHANGE_TITLE';
const CONVERT_EDITOR_MODE = 'write/CONVERT_EDITOR_MODE';
const SET_HTML = 'write/SET_HTML';
const SET_TEXT_BODY = 'write/SET_TEXT_BODY';
const CHANGE_TAGS = 'write/CHANGE_TAGS';
const OPEN_PUBLISH = 'write/OPEN_PUBLISH';
const CLOSE_PUBLISH = 'write/CLOSE_PUBLISH';
const SET_DEFAULT_DESCRIPTION = 'write/SET_DEFAULT_DESCRIPTION';
const CHANGE_DESCRIPTION = 'write/CHANGE_DESCRIPTION';

export const changeMarkdown = createStandardAction(CHANGE_MARKDOWN)<string>();
export const changeTitle = createStandardAction(CHANGE_TITLE)<string>();
export const convertEditorMode = createStandardAction(CONVERT_EDITOR_MODE)();
export const setHtml = createStandardAction(SET_HTML)<string>();
export const changeTags = createStandardAction(CHANGE_TAGS)<string[]>();
export const openPublish = createStandardAction(OPEN_PUBLISH)<void>();
export const closePublish = createStandardAction(CLOSE_PUBLISH)<void>();
export const setTextBody = createStandardAction(SET_TEXT_BODY)<string>();
export const setDefaultDescription = createStandardAction(
  SET_DEFAULT_DESCRIPTION,
)<string>();
export const changeDescription = createStandardAction(CHANGE_DESCRIPTION)<
  string
>();

type ChangeMarkdown = ReturnType<typeof changeMarkdown>;
type ChangeTitle = ReturnType<typeof changeTitle>;
type SetHtml = ReturnType<typeof setHtml>;
type ChangeTags = ReturnType<typeof changeTags>;
type OpenPublish = ReturnType<typeof openPublish>;
type ClosePublish = ReturnType<typeof closePublish>;
type SetTextBody = ReturnType<typeof setTextBody>;
type SetDefaultDescription = ReturnType<typeof setDefaultDescription>;
type ChangeDescription = ReturnType<typeof changeDescription>;

export enum WriteMode {
  MARKDOWN = 'MARKDOWN',
  WYSIWYG = 'WYSIWYG',
}

export type WriteState = {
  mode: WriteMode;
  markdown: string;
  title: string;
  html: string;
  tags: string[];
  publish: boolean;
  textBody: string;
  defaultDescription: string;
  description: string;
};

const initialState: WriteState = {
  mode: WriteMode.WYSIWYG,
  markdown: '',
  title: '',
  html: '',
  tags: [],
  publish: false,
  textBody: '',
  defaultDescription: '',
  description: '',
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
    [CHANGE_TAGS]: (state, action: ChangeTags) =>
      updateKey(state, 'tags', action.payload),
    [OPEN_PUBLISH]: state => updateKey(state, 'publish', true),
    [CLOSE_PUBLISH]: state => updateKey(state, 'publish', false),
    [SET_TEXT_BODY]: (state, { payload: textBody }: SetTextBody) =>
      updateKey(state, 'textBody', textBody),
    [SET_DEFAULT_DESCRIPTION]: (
      state,
      { payload: defaultDescription }: SetDefaultDescription,
    ) => updateKey(state, 'defaultDescription', defaultDescription),
    [CHANGE_DESCRIPTION]: (
      state,
      { payload: description }: ChangeDescription,
    ) => updateKey(state, 'description', description),
  },
  initialState,
);

export default write;

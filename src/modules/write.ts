import { createStandardAction } from 'typesafe-actions';
import { createReducer, updateKey } from '../lib/utils';
import { strict } from 'assert';

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
const SET_PRIVACY = 'write/SET_PRIVACY';
const CHANGE_URL_SLUG = 'write/CHANGE_URL';
const SET_THUMBNAIL = 'write/SET_THUMBNAIL';
const TOGGLE_EDIT_SERIES = 'write/TOGGLE_EDIT_SERIES';
const SELECT_SERIES = 'write/SELECT_SERIES';

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
export const setPrivacy = createStandardAction(SET_PRIVACY)<boolean>();
export const changeUrlSlug = createStandardAction(CHANGE_URL_SLUG)<string>();
export const setThumbnail = createStandardAction(SET_THUMBNAIL)<
  string | null
>();
export const toggleEditSeries = createStandardAction(TOGGLE_EDIT_SERIES)<
  undefined
>();
export const selectSeries = createStandardAction(SELECT_SERIES)<{
  id: string;
  name: string;
}>();

type ChangeMarkdown = ReturnType<typeof changeMarkdown>;
type ChangeTitle = ReturnType<typeof changeTitle>;
type SetHtml = ReturnType<typeof setHtml>;
type ChangeTags = ReturnType<typeof changeTags>;
type OpenPublish = ReturnType<typeof openPublish>;
type ClosePublish = ReturnType<typeof closePublish>;
type SetTextBody = ReturnType<typeof setTextBody>;
type SetDefaultDescription = ReturnType<typeof setDefaultDescription>;
type ChangeDescription = ReturnType<typeof changeDescription>;
type SetPrivacy = ReturnType<typeof setPrivacy>;
type ChangeUrlSlug = ReturnType<typeof changeUrlSlug>;
type SetThumbnail = ReturnType<typeof setThumbnail>;
type SelectSeries = ReturnType<typeof selectSeries>;

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
  publish: boolean; // publish screen visibility
  textBody: string;
  defaultDescription: string;
  description: string;
  isPrivate: boolean;
  urlSlug: string;
  thumbnail: string | null;
  editSeries: boolean;
  selectedSeries: {
    id: string;
    name: string;
  } | null;
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
  isPrivate: false,
  urlSlug: '',
  thumbnail: null,
  editSeries: false,
  selectedSeries: null,
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
    ) => updateKey(state, 'description', description.slice(0, 150)),
    [SET_PRIVACY]: (state, { payload: isPrivate }: SetPrivacy) =>
      updateKey(state, 'isPrivate', isPrivate),
    [CHANGE_URL_SLUG]: (state, { payload: urlSlug }: ChangeUrlSlug) =>
      updateKey(state, 'urlSlug', urlSlug),
    [SET_THUMBNAIL]: (state, { payload: thumbnail }: SetThumbnail) =>
      updateKey(state, 'thumbnail', thumbnail),
    [TOGGLE_EDIT_SERIES]: state =>
      updateKey(state, 'editSeries', !state.editSeries),
    [SELECT_SERIES]: (state, action: SelectSeries) =>
      updateKey(state, 'selectedSeries', action.payload),
  },
  initialState,
);

export default write;

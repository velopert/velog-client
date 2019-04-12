import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../lib/utils';

const CHANGE_MARKDOWN = 'write/CHANGE_MARKDOWN';
const CHANGE_TITLE = 'write/CHANGE_TITLE';

export const changeMarkdown = createStandardAction(CHANGE_MARKDOWN)<string>();
export const changeTitle = createStandardAction(CHANGE_TITLE)<string>();

type ChangeMarkdown = ReturnType<typeof changeMarkdown>;
type ChangeTitle = ReturnType<typeof changeTitle>;

export type WriteState = {
  markdown: string;
  title: string;
};

const initialState: WriteState = {
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
  },
  initialState,
);

export default write;

import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../lib/utils';

const CHANGE_MARKDOWN = 'write/CHANGE_MARKDOWN';

export const changeMarkdown = createStandardAction(CHANGE_MARKDOWN)<string>();

type ChangeMarkdown = ReturnType<typeof changeMarkdown>;

export type WriteState = {
  markdown: string;
};

const initialState: WriteState = {
  markdown: '',
};

const write = createReducer(
  {
    [CHANGE_MARKDOWN]: (state, action: ChangeMarkdown) => ({
      ...state,
      markdown: action.payload,
    }),
  },
  initialState,
);

export default write;

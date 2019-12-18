import { createReducer, deprecated, ActionType } from 'typesafe-actions';
import { updateKey } from '../lib/utils';
import { RootState } from '.';

const { createStandardAction } = deprecated;

const SET_POST_ID = 'post/SET_POST_ID';

export interface PostState {
  id: string | null;
}

const initialState: PostState = {
  id: null
};

const actions = {
  setPostId: createStandardAction(SET_POST_ID)<string>()
};

export const postActions = actions;

type RootAction = ActionType<typeof actions>;

const post = createReducer<PostState, RootAction>(
  initialState
).handleAction(actions.setPostId, (state, action) =>
  updateKey(state, 'id', action.payload)
);

export const selectPostId = (state: RootState) => state.post.id;

export default post;

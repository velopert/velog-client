import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface PostState {
  id: string | null;
}

const initialState: PostState = {
  id: null,
};

const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const selectPostId = (state: RootState) => state.post.id;

export default post;

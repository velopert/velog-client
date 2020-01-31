import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ScrollState = {
  main: number;
  'user/posts': number;
};

export type ScrollKey = keyof ScrollState;

const initialState: ScrollState = {
  main: 0,
  'user/posts': 0,
};

const scroll = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    preserveScroll(
      state,
      { payload: { key, top } }: PayloadAction<{ key: ScrollKey; top: number }>,
    ) {
      state[key] = top;
    },
  },
});

export default scroll;

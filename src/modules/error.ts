import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ErrorState = {
  errorType: 'NOT_FOUND' | 'CRASHED' | null;
};

const initialState: ErrorState = {
  errorType: null,
};

const error = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showNotFound(state) {
      state.errorType = 'NOT_FOUND';
    },
    reset(state) {
      state.errorType = null;
    },
  },
});

export default error;

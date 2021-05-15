import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Timeframe = 'day' | 'week' | 'month' | 'year';
export interface HomeState {
  timeframe: Timeframe;
}

const initialState: HomeState = {
  timeframe: 'week',
};
const home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    choose(state, action: PayloadAction<Timeframe>) {
      state.timeframe = action.payload;
    },
  },
});

export default home;

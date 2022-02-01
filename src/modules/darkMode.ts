import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DarkModeState = {
  theme: 'dark' | 'light' | 'default';
  systemTheme: 'dark' | 'light' | 'not-ready';
};

const initialState: DarkModeState = {
  theme: 'default',
  systemTheme: 'not-ready',
};

const darkMode = createSlice({
  name: 'darkMode',
  initialState: initialState,
  reducers: {
    enableDarkMode(state) {
      state.theme = 'dark';
    },
    enableLightMode(state) {
      state.theme = 'light';
    },
    setSystemTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.systemTheme = action.payload;
    },
  },
});

export default darkMode;

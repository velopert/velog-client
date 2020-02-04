import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HeaderState {
  custom: boolean;
  userLogo: null | UserLogo;
  username: string | null;
}

export type UserLogo = {
  title: string | null;
  logo_image: string | null;
};

const initialState: HeaderState = {
  custom: false,
  userLogo: null,
  username: null,
};

const header = createSlice({
  name: 'header',
  initialState,
  reducers: {
    enterUserVelog(
      state,
      action: PayloadAction<{
        username: string;
        userLogo?: UserLogo | null;
      }>,
    ) {
      state.custom = true;
      state.userLogo = action.payload.userLogo || null;
      state.username = action.payload.username;
    },
    leaveUserVelog(state) {
      state.custom = false;
      state.userLogo = null;
      state.username = null;
    },
  },
});

// const SET_CUSTOM = 'header/SET_CUSTOM';
// const SET_USER_LOGO = 'header/SET_USER_LOGO';
// const SET_VELOG_USERNAME = 'header/SET_VELOG_USERNAME';

// export const setCustom = createStandardAction(SET_CUSTOM)<boolean>();
// export const setUserLogo = createStandardAction(SET_USER_LOGO)<UserLogo>();
// export const setVelogUsername = createStandardAction(SET_VELOG_USERNAME)<
//   string
// >();

// export const headerActions = {
//   setCustom,
//   setUserLogo,
//   setVelogUsername,
// };

// type HeaderAction = ActionType<typeof headerActions>;

// const header = createReducer<HeaderState, HeaderAction>(initialState, {
//   [SET_CUSTOM]: (state, action) => {
//     return updateKey(state, 'custom', action.payload);
//   },
//   [SET_USER_LOGO]: (state, { payload }) => {
//     return updateKey(state, 'userLogo', payload);
//   },
//   [SET_VELOG_USERNAME]: (state, { payload }) => {
//     return updateKey(state, 'velogUsername', payload);
//   },
// });

export default header;

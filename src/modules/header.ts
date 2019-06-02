import { createReducer, updateKey } from '../lib/utils';
import { createStandardAction } from 'typesafe-actions';

const SET_CUSTOM = 'header/SET_CUSTOM';
const SET_USER_LOGO = 'header/SET_USER_LOGO';
const SET_VELOG_USERNAME = 'header/SET_VELOG_USERNAME';

export type UserLogo = {
  title: string | null;
  logo_image: string | null;
};

export interface HeaderState {
  custom: boolean;
  userLogo: null | UserLogo;
  velogUsername: string | null;
}

export const setCustom = createStandardAction(SET_CUSTOM)<boolean>();
export const setUserLogo = createStandardAction(SET_USER_LOGO)<UserLogo>();
export const setVelogUsername = createStandardAction(SET_VELOG_USERNAME)<
  string
>();

type SetCustom = ReturnType<typeof setCustom>;
type SetUserLogo = ReturnType<typeof setUserLogo>;
type SetVelogUsername = ReturnType<typeof setVelogUsername>;

const initialState: HeaderState = {
  custom: false,
  userLogo: null,
  velogUsername: null,
};

const header = createReducer(
  {
    [SET_CUSTOM]: (state, action: SetCustom) => {
      return updateKey(state, 'custom', action.payload);
    },
    [SET_USER_LOGO]: (state, { payload }: SetUserLogo) => {
      return updateKey(state, 'userLogo', payload);
    },
    [SET_VELOG_USERNAME]: (state, { payload }: SetVelogUsername) => {
      return updateKey(state, 'velogUsername', payload);
    },
  },
  initialState,
);

export default header;

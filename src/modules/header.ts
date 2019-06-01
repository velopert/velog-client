import { createReducer, updateKey } from '../lib/utils';
import { createStandardAction } from 'typesafe-actions';

const SET_CUSTOM = 'header/SET_CUSTOM';
const SET_USER_LOGO = 'header/SET_USER_LOGO';

type UserLogo = {
  title: string | null;
  logo_image: string | null;
};

export interface HeaderState {
  custom: boolean;
  userLogo: null | UserLogo;
}

export const setCustom = createStandardAction(SET_CUSTOM)<boolean>();
export const setUserLogo = createStandardAction(SET_USER_LOGO)<UserLogo>();

type SetCustom = ReturnType<typeof setCustom>;
type SetUserLogo = ReturnType<typeof setUserLogo>;

const initialState: HeaderState = {
  custom: false,
  userLogo: null,
};

const header = createReducer(
  {
    [SET_CUSTOM]: (state, action: SetCustom) => {
      return updateKey(state, 'custom', action.payload);
    },
    [SET_USER_LOGO]: (state, { payload }: SetUserLogo) => {
      return updateKey(state, 'userLogo', payload);
    },
  },
  initialState,
);

export default header;

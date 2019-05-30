import { createReducer, updateKey } from '../lib/utils';
import { createStandardAction } from 'typesafe-actions';

const SET_CUSTOM = 'header/SET_CUSTOM';

export const setCustom = createStandardAction(SET_CUSTOM)<boolean>();

type UserLogo = {
  title: string;
  logo_image: string;
};

interface HeaderState {
  custom: boolean;
  userLogo: null | UserLogo;
}

type SetCustom = ReturnType<typeof setCustom>;

const initialState = {
  custom: false,
  userLogo: null,
};

const header = createReducer(
  {
    [SET_CUSTOM]: (state, action: SetCustom) => {
      return updateKey(state, 'custom', action.payload);
    },
  },
  initialState,
);

export default header;

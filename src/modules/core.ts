import { createStandardAction } from 'typesafe-actions';
import produce from 'immer';
import { createReducer } from '../lib/utils';

const SET_LAYER = 'core/SET_LAYER';
const SHOW_AUTH_MODAL = 'core/SHOW_AUTH_MODAL';
const CHANGE_AUTH_MODAL_MODE = 'core/CHANGE_AUTH_MODAL_MODE';
const CLOSE_AUTH_MODAL = 'core/CLOSE_AUTH_MODAL';

export type AuthMode = 'REGISTER' | 'LOGIN';

export const setLayer = createStandardAction(SET_LAYER)<boolean>();
export const showAuthModal = createStandardAction(SHOW_AUTH_MODAL)<AuthMode>();
export const changeAuthModalMode = createStandardAction(CHANGE_AUTH_MODAL_MODE)<
  AuthMode
>();
export const closeAuthModal = createStandardAction(CLOSE_AUTH_MODAL)();

type SetLayer = ReturnType<typeof setLayer>;
type ShowAuthModal = ReturnType<typeof showAuthModal>;
type ChangeAuthModalMode = ReturnType<typeof changeAuthModalMode>;

export type CoreState = {
  layer: boolean;
  auth: {
    visible: boolean;
    mode: AuthMode;
  };
};

const initialState: CoreState = {
  layer: false,
  auth: {
    visible: false,
    mode: 'LOGIN',
  },
};

const core = createReducer<CoreState>(
  {
    [SET_LAYER]: (state, action: SetLayer) => ({
      ...state,
      layer: action.payload,
    }),
    [SHOW_AUTH_MODAL]: (state, action: ShowAuthModal) =>
      produce(state, draft => {
        draft.auth.mode = action.payload;
        draft.auth.visible = true;
        draft.layer = true;
      }),
    [CHANGE_AUTH_MODAL_MODE]: (state, action: ChangeAuthModalMode) =>
      produce(state, draft => {
        draft.auth.mode = action.payload;
      }),
    [CLOSE_AUTH_MODAL]: state =>
      produce(state, draft => {
        draft.auth.visible = false;
        draft.layer = false;
      }),
  },
  initialState,
);

export default core;

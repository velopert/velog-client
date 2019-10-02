import { createReducer } from 'typesafe-actions';
import { CoreState, CoreAction } from './types';
import {
  SET_LAYER,
  SHOW_AUTH_MODAL,
  CHANGE_AUTH_MODAL_MODE,
  CLOSE_AUTH_MODAL,
  SET_USER,
  OPEN_POPUP,
  CLOSE_POPUP,
} from './actions';
import produce from 'immer';
import { updateKey } from '../../lib/utils';

const initialState: CoreState = {
  layer: false,
  auth: {
    visible: false,
    mode: 'LOGIN',
  },
  user: null,
  popup: {
    visible: false,
    title: '',
    message: '',
  },
};

const core = createReducer<CoreState, CoreAction>(initialState, {
  [SET_LAYER]: (state, action) => ({
    ...state,
    layer: action.payload,
  }),
  [SHOW_AUTH_MODAL]: (state, action) =>
    produce(state, draft => {
      draft.auth.mode = action.payload;
      draft.auth.visible = true;
      draft.layer = true;
    }),
  [CHANGE_AUTH_MODAL_MODE]: (state, action) =>
    produce(state, draft => {
      draft.auth.mode = action.payload;
    }),
  [CLOSE_AUTH_MODAL]: state =>
    produce(state, draft => {
      draft.auth.visible = false;
      draft.layer = false;
    }),
  [SET_USER]: (state, { payload: user }) => updateKey(state, 'user', user),
  [OPEN_POPUP]: (state, action) =>
    produce(state, draft => {
      draft.popup.title = action.payload.title;
      draft.popup.message = action.payload.message;
      draft.popup.visible = true;
    }),
  [CLOSE_POPUP]: state =>
    produce(state, draft => {
      draft.popup.visible = false;
    }),
});

export default core;

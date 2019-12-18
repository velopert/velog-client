import { deprecated } from 'typesafe-actions';
import { AuthMode } from './types';
import { CurrentUser } from '../../lib/graphql/user';

const { createStandardAction } = deprecated;

export const SET_LAYER = 'core/SET_LAYER';
export const SHOW_AUTH_MODAL = 'core/SHOW_AUTH_MODAL';
export const CHANGE_AUTH_MODAL_MODE = 'core/CHANGE_AUTH_MODAL_MODE';
export const CLOSE_AUTH_MODAL = 'core/CLOSE_AUTH_MODAL';
export const SET_USER = 'core/SET_USER';
export const OPEN_POPUP = 'core/OPEN_POPUP';
export const CLOSE_POPUP = 'core/CLOSE_POPUP';

export const setLayer = createStandardAction(SET_LAYER)<boolean>();
export const showAuthModal = createStandardAction(SHOW_AUTH_MODAL)<AuthMode>();
export const changeAuthModalMode = createStandardAction(CHANGE_AUTH_MODAL_MODE)<
  AuthMode
>();
export const closeAuthModal = createStandardAction(CLOSE_AUTH_MODAL)();
export const setUser = createStandardAction(SET_USER)<CurrentUser | null>();

export const openPopup = createStandardAction(OPEN_POPUP)<{
  title?: string;
  message: string;
}>();
export const closePopup = createStandardAction(CLOSE_POPUP)();

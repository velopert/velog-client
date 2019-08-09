import { updateKey } from '../lib/utils';
import {
  createStandardAction,
  createReducer,
  ActionType,
} from 'typesafe-actions';

const SET_CUSTOM = 'header/SET_CUSTOM';
const SET_USER_LOGO = 'header/SET_USER_LOGO';
const SET_VELOG_USERNAME = 'header/SET_VELOG_USERNAME';

const START_FLOATING = 'header/START_FLOATING';
const EXIT_FLOATING = 'header/EXIT_FLOATING';
const SET_MARGIN = 'header/SET_MARGIN';
const SET_DIRECTION = 'header/SET_DIRECTION';
const SET_BASE_Y = 'header/SET_BASE_Y';

export type UserLogo = {
  title: string | null;
  logo_image: string | null;
};

export interface HeaderState {
  custom: boolean;
  userLogo: null | UserLogo;
  velogUsername: string | null;
  floating: boolean;
  margin: number;
  direction: 'UP' | 'DOWN';
  baseY: number;
}

export const setCustom = createStandardAction(SET_CUSTOM)<boolean>();
export const setUserLogo = createStandardAction(SET_USER_LOGO)<UserLogo>();
export const setVelogUsername = createStandardAction(SET_VELOG_USERNAME)<
  string
>();

export const startFloating = createStandardAction(START_FLOATING)<undefined>();
export const exitFloating = createStandardAction(EXIT_FLOATING)<undefined>();
export const setMargin = createStandardAction(SET_MARGIN)<number>();
export const setDirection = createStandardAction(SET_DIRECTION)<
  'UP' | 'DOWN'
>();
export const setBaseY = createStandardAction(SET_BASE_Y)<number>();

export const headerActions = {
  setCustom,
  setUserLogo,
  setVelogUsername,
  startFloating,
  exitFloating,
  setMargin,
  setDirection,
  setBaseY,
};

type HeaderAction = ActionType<typeof headerActions>;

const initialState: HeaderState = {
  custom: false,
  userLogo: null,
  velogUsername: null,
  floating: false,
  margin: 0,
  direction: 'DOWN',
  baseY: 0,
};

const header = createReducer<HeaderState, HeaderAction>(initialState, {
  [SET_CUSTOM]: (state, action) => {
    return updateKey(state, 'custom', action.payload);
  },
  [SET_USER_LOGO]: (state, { payload }) => {
    return updateKey(state, 'userLogo', payload);
  },
  [SET_VELOG_USERNAME]: (state, { payload }) => {
    return updateKey(state, 'velogUsername', payload);
  },
  [START_FLOATING]: state => ({
    ...state,
    margin: -80,
    floating: true,
  }),
  [EXIT_FLOATING]: state => ({
    ...state,
    floating: false,
    margin: -80,
  }),
  [SET_MARGIN]: (state, action) => updateKey(state, 'margin', action.payload),
  [SET_DIRECTION]: (state, action) =>
    updateKey(state, 'direction', action.payload),
  [SET_BASE_Y]: (state, action) => updateKey(state, 'baseY', action.payload),
});

export default header;

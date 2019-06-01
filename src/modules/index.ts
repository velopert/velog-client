import { combineReducers } from 'redux';
import core, { CoreState } from './core';
import write, { WriteState } from './write';
import header, { HeaderState } from './header';

export type RootState = {
  core: CoreState;
  write: WriteState;
  header: HeaderState;
};

const rootReducer = combineReducers({
  core,
  write,
  header,
});

export default rootReducer;

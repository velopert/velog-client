import { combineReducers } from 'redux';
import core, { CoreState } from './core';
import write, { WriteState } from './write';

export type RootState = {
  core: CoreState;
  write: WriteState;
};

const rootReducer = combineReducers({
  core,
  write,
});

export default rootReducer;

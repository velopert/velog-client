import { combineReducers } from 'redux';
import core, { CoreState } from './core';
import write, { WriteState } from './write';
import header, { HeaderState } from './header';
import post, { PostState } from './post';
import error, { ErrorState } from './error';

export type RootState = {
  core: CoreState;
  write: WriteState;
  header: HeaderState;
  post: PostState;
  error: ErrorState;
};

const rootReducer = combineReducers({
  core,
  write,
  header,
  post,
  error: error.reducer,
});

export default rootReducer;

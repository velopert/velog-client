import { combineReducers } from 'redux';
import core, { CoreState } from './core';
import write, { WriteState } from './write';
import header, { HeaderState } from './header';
import post, { PostState } from './post';

export type RootState = {
  core: CoreState;
  write: WriteState;
  header: HeaderState;
  post: PostState;
};

const rootReducer = combineReducers({
  core,
  write,
  header,
  post,
});

export default rootReducer;

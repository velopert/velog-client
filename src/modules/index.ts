import { combineReducers } from 'redux';
import core, { CoreState } from './core';
import write, { WriteState } from './write';
import header, { HeaderState } from './header';
import post, { PostState } from './post';
import error, { ErrorState } from './error';
import scroll, { ScrollState } from './scroll';
import home, { HomeState } from './home';
import darkMode, { DarkModeState } from './darkMode';

export type RootState = {
  core: CoreState;
  write: WriteState;
  header: HeaderState;
  post: PostState;
  error: ErrorState;
  scroll: ScrollState;
  home: HomeState;
  darkMode: DarkModeState;
};

const rootReducer = combineReducers({
  core,
  write,
  header: header.reducer,
  post: post.reducer,
  error: error.reducer,
  scroll: scroll.reducer,
  home: home.reducer,
  darkMode: darkMode.reducer,
});

export default rootReducer;

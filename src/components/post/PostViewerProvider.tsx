import React, { createContext, useReducer, Dispatch, useContext } from 'react';
import { parseHeadings } from '../../lib/heading';

type Toc = ReturnType<typeof parseHeadings>;

type SetSeriesOpen = { type: 'SET_SERIES_OPEN'; payload: boolean };
type SetToc = { type: 'SET_TOC'; payload: Toc };

type Action = SetSeriesOpen | SetToc;

type PostViewerState = {
  seriesOpen: boolean;
  toc: null | Toc;
};

const PostViewerStateContext = createContext<PostViewerState | null>(null);
const PostViewerDispatchContext = createContext<Dispatch<Action> | null>(null);
const PostViewerPrefetchContext = createContext<Function | null>(null);

function reducer(state: PostViewerState, action: Action): PostViewerState {
  switch (action.type) {
    case 'SET_SERIES_OPEN':
      return {
        ...state,
        seriesOpen: action.payload,
      };
    case 'SET_TOC':
      return {
        ...state,
        toc: action.payload,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

export const usePostViewerState = () => {
  const state = useContext(PostViewerStateContext);
  if (!state) {
    throw new Error('not wrapped with PostViewerProvider');
  }
  return state;
};

export const usePostViewerDispatch = () => {
  const dispatch = useContext(PostViewerDispatchContext);
  if (!dispatch) {
    throw new Error('not wrapped with PostViewerProvider');
  }
  return dispatch;
};

export const usePostViewerPrefetch = () => {
  const prefetch = useContext(PostViewerPrefetchContext);
  if (!prefetch) {
    throw new Error('not wrapped with PostViewerProvider');
  }
  return prefetch;
};

const PostViewerProvider: React.FC<{ prefetchLinkedPosts: Function }> = ({
  children,
  prefetchLinkedPosts,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    seriesOpen: false,
    toc: null,
  });
  return (
    <PostViewerPrefetchContext.Provider value={prefetchLinkedPosts}>
      <PostViewerStateContext.Provider value={state}>
        <PostViewerDispatchContext.Provider
          value={dispatch}
          children={children}
        />
      </PostViewerStateContext.Provider>
    </PostViewerPrefetchContext.Provider>
  );
};

export default PostViewerProvider;

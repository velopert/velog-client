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

const PostViewerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    seriesOpen: false,
    toc: null,
  });
  return (
    <PostViewerStateContext.Provider value={state}>
      <PostViewerDispatchContext.Provider
        value={dispatch}
        children={children}
      />
    </PostViewerStateContext.Provider>
  );
};

export default PostViewerProvider;

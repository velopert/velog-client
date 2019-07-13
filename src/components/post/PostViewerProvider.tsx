import React, { createContext, useReducer, Dispatch, useContext } from 'react';

type Action = { type: 'SET_SERIES_OPEN'; payload: boolean };
type PostViewerState = {
  seriesOpen: boolean;
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
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
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

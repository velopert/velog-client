import post, { PostState } from '../post';

describe('post redux module', () => {
  const initialState: PostState = {
    id: null,
  };
  const { reducer, actions } = post;
  it('has initialState', () => {
    const state = post.reducer(undefined, { type: 'INIT' } as any);
    expect(state).toEqual(initialState);
  });
  describe('reducer', () => {
    it('handles SET_ID', () => {
      const state = reducer(initialState, actions.setPostId('aaaa'));
      expect(state.id).toBe('aaaa');
    });
  });
});

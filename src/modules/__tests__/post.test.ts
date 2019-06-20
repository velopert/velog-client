import post, { postActions, PostState } from '../post';

describe('post redux module', () => {
  const initialState: PostState = {
    id: null,
  };
  it('has initialState', () => {
    const state = post(undefined, { type: 'INIT' } as any);
    expect(state).toEqual(initialState);
  });
  describe('reducer', () => {
    it('handles SET_ID', () => {
      const state = post(initialState, postActions.setPostId('aaaa'));
      expect(state.id).toBe('aaaa');
    });
  });
});

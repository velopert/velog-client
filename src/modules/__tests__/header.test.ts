import header, { HeaderState } from '../header';

describe('header redux module', () => {
  describe('reducer', () => {
    const initialState: HeaderState = {
      custom: false,
      userLogo: null,
      username: null,
    };
    const { reducer, actions } = header;
    it('should have initialState', () => {
      const state = reducer(undefined, { type: 'INIT' });
      expect(state).toEqual(initialState);
    });
    it('handles enterUserVelog action', () => {
      let state = reducer(
        initialState,
        actions.enterUserVelog({
          username: 'velopert',
          userLogo: {
            title: 'velopert.log',
            logo_image: null,
          },
        }),
      );
      expect(state.custom).toBe(true);
      expect(state.username).toBe('velopert');
      expect(state.userLogo).toEqual({
        title: 'velopert.log',
        logo_image: null,
      });
    });
    it('handles leaveUserVelog', () => {
      let state: HeaderState = {
        custom: true,
        username: 'velopert',
        userLogo: {
          title: 'velopert.log',
          logo_image: null,
        },
      };
      state = reducer(state, actions.leaveUserVelog);
      expect(state).toEqual({
        custom: false,
        username: null,
        userLogo: null,
      });
    });
  });
});

import header, { setCustom, setUserLogo, setVelogUsername } from '../header';

describe('header redux module', () => {
  describe('reducer', () => {
    const initialState = {
      custom: false,
      userLogo: null,
      velogUsername: null,
    };
    it('should have initialState', () => {
      const state = header(undefined, {});
      expect(state).toEqual(initialState);
    });
    it('handles SET_CUSTOM action', () => {
      let state = header(initialState, setCustom(true));
      expect(state.custom).toBe(true);
      state = header(initialState, setCustom(false));
      expect(state.custom).toBe(false);
    });
    it('handles SET_USER_LOGO action', () => {
      let state = header(
        initialState,
        setUserLogo({ title: 'SAMPLE', logo_image: null }),
      );
      expect(state.userLogo).toHaveProperty('title', 'SAMPLE');
    });
    it('handles SET_VELOG_USER', () => {
      let state = header(initialState, setVelogUsername('velopert'));
      expect(state.velogUsername).toBe('velopert');
    });
  });
});

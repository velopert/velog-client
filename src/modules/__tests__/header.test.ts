import header, { setCustom } from '../header';

describe('header redux module', () => {
  describe('reducer', () => {
    const initialState = {
      custom: false,
      userLogo: null,
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
  });
});

import * as write from '../write';

const reducer = write.default;

describe('write redux module', () => {
  const getInitialState = () => reducer(undefined, {});
  it('should return initialState', () => {
    const state = getInitialState();
    expect(state).toEqual({
      markdown: '',
      title: '',
      mode: 'WYSIWYG',
      html: '',
      tags: [],
      publish: false,
    });
  });
  describe('action handlers', () => {
    it('CHANGE_MARKDOWN', () => {
      let state = getInitialState();
      state = reducer(state, write.changeMarkdown('Hello'));
      expect(state.markdown).toBe('Hello');
    });
    it('CHANGE_TITLE', () => {
      let state = getInitialState();
      state = reducer(state, write.changeTitle('World'));
      expect(state.title).toBe('World');
    });
    it('CONVERT_EDITOR_MODE', () => {
      let state = getInitialState();
      state = reducer(state, write.convertEditorMode());
      expect(state.mode).toBe('MARKDOWN');
      state = reducer(state, write.convertEditorMode());
      expect(state.mode).toBe('WYSIWYG');
    });
    it('SET_HTML', () => {
      let state = getInitialState();
      const html = '<p>Hello World</p>';
      state = reducer(state, write.setHtml(html));
      expect(state.html).toBe(html);
    });
    it('CHANGE_TAGS', () => {
      let state = getInitialState();
      const nextTags = ['태그1', '태그2'];
      state = reducer(state, write.changeTags(nextTags));
      expect(state.tags).toBe(nextTags);
    });
    it('OPEN_PUBLISH', () => {
      let state = getInitialState();
      state = reducer(state, write.openPublish());
      expect(state.publish).toBe(true);
    });
    it('CLOSE_PUBLISH', () => {
      let state = getInitialState();
      state = reducer(state, write.closePublish());
      expect(state.publish).toBe(false);
    });
  });
});

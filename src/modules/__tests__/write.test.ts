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
      textBody: '',
      defaultDescription: '',
      description: '',
      isPrivate: false,
      urlSlug: '',
      thumbnail: null,
      editSeries: false,
      selectedSeries: null,
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
    it('SET_TEXT_BODY', () => {
      let state = getInitialState();
      state = reducer(state, write.setTextBody('textbody'));
      expect(state.textBody).toBe('textbody');
    });
    it('SET_DEFAULT_DESCRIPTION', () => {
      let state = getInitialState();
      state = reducer(state, write.setDefaultDescription('description'));
      expect(state.defaultDescription).toBe('description');
    });
    it('CHANGE_DESCRIPTION', () => {
      let state = getInitialState();
      state = reducer(state, write.changeDescription('description'));
      expect(state.description).toBe('description');

      const longText = new Array(151).fill('a').join('');
      state = reducer(state, write.changeDescription(longText));
      expect(state.description).toHaveLength(150);
    });
    it('SET_PRIVACY', () => {
      let state = getInitialState();
      state = reducer(state, write.setPrivacy(true));
      expect(state.isPrivate).toBeTruthy();
      state = reducer(state, write.setPrivacy(false));
      expect(state.isPrivate).toBeFalsy();
    });
    it('CHANGE_URL_SLUG', () => {
      let state = getInitialState();
      state = reducer(state, write.changeUrlSlug('urlslug'));
      expect(state.urlSlug).toBe('urlslug');
    });
    it('SET_THUMBNAIL', () => {
      let state = getInitialState();
      state = reducer(
        state,
        write.setThumbnail('https://images.velog.io/sample.jpg'),
      );
      expect(state.thumbnail).toBe('https://images.velog.io/sample.jpg');
    });
    it('TOGGLE_EDIT_SERIES', () => {
      let state = getInitialState();
      state = reducer(state, write.toggleEditSeries());
      expect(state.editSeries).toBe(true);
      state = reducer(state, write.toggleEditSeries());
      expect(state.editSeries).toBe(false);
    });
    it('SELECT_SERIES', () => {
      let state = getInitialState();
      const sample = {
        id: '03567f36-d01a-43b2-9006-006f7a9a8d8a',
        name: 'sample series',
      };
      state = reducer(state, write.selectSeries(sample));
      expect(state.selectedSeries).toBe(sample);
    });
    it('CLEAR_EDITOR', () => {
      let state = getInitialState();
      state = {
        ...state,
        title: 'blabla',
      };
      expect(state.title).toBe('blabla');
      state = reducer(state, write.clearEditor());
      expect(state.title).toBe('');
    });
  });
});

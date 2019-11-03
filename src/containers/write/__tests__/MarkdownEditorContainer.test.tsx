import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MarkdownEditorContainer, {
  MarkdownEditorContainerProps,
} from '../MarkdownEditorContainer';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';
import { changeMarkdown } from '../../../modules/write';
import { MemoryRouter } from 'react-router';

describe('MarkdownEditorContainer', () => {
  const setup = (props: Partial<MarkdownEditorContainerProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = render(
      <MemoryRouter>
        <Provider store={store}>
          <MarkdownEditorContainer {...props} />
        </Provider>
      </MemoryRouter>,
    );
    return {
      store,
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('opens publish screen', () => {
    const utils = setup();
    const publishButton = utils.getByText('출간하기');
    fireEvent.click(publishButton);
    expect(utils.store.getState().write.publish).toBe(true);
  });
  it('sets stripped markdown to defaultDescription', () => {
    const utils = setup();
    const { store } = utils;
    store.dispatch(changeMarkdown('# heading\nHello World'));
    const publishButton = utils.getByText('출간하기');
    fireEvent.click(publishButton);
    expect(utils.store.getState().write.defaultDescription).toBe('Hello World');
  });
});

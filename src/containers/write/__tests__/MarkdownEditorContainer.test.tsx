import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MarkdownEditorContainer, {
  MarkdownEditorContainerProps,
} from '../MarkdownEditorContainer';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';
import { changeMarkdown } from '../../../modules/write';

import renderWithProviders from '../../../lib/renderWithProviders';
import { HelmetProvider } from 'react-helmet-async';

describe('MarkdownEditorContainer', () => {
  const setup = (props: Partial<MarkdownEditorContainerProps> = {}) => {
    const utils = renderWithProviders(
      <HelmetProvider>
        <MarkdownEditorContainer {...props} />
      </HelmetProvider>,
    );
    return {
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

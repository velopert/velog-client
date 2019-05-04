import * as React from 'react';
import { render } from 'react-testing-library';
import MarkdownEditorContainer, {
  MarkdownEditorContainerProps,
} from '../MarkdownEditorContainer';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';

describe('MarkdownEditorContainer', () => {
  const setup = (props: Partial<MarkdownEditorContainerProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = render(
      <Provider store={store}>
        <MarkdownEditorContainer {...props} />
      </Provider>,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});

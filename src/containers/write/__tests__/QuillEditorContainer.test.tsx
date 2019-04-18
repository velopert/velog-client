import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import QuillEditorContainer, {
  QuillEditorContainerProps,
} from '../QuillEditorContainer';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';

describe('QuillEditorContainer', () => {
  const setup = (props: Partial<QuillEditorContainerProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = render(
      <Provider store={store}>
        <QuillEditorContainer {...props} />
      </Provider>,
    );
    return {
      store,
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
  it('changes title', () => {
    const utils = setup();
    const titleTextarea = utils.getByPlaceholderText('제목을 입력하세요');
    fireEvent.change(titleTextarea, {
      target: {
        value: 'Hello world',
      },
    });
    expect(utils.store.getState().write.title).toBe('Hello world');
  });
});

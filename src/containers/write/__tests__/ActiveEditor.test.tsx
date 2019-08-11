import * as React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import ActiveEditor, { ActiveEditorProps } from '../ActiveEditor';
import { createStore } from 'redux';
import rootReducer from '../../../modules';
import { Provider } from 'react-redux';

describe('ActiveEditor', () => {
  const setup = (props: Partial<ActiveEditorProps> = {}) => {
    const setupStore = () => {
      const store = createStore(rootReducer);
      return store;
    };
    const store = setupStore();
    const utils = render(
      <Provider store={store}>
        <ActiveEditor {...props} />
      </Provider>,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const utils = setup();
    utils.getByTestId('quill'); // initial mode: WYSIWYG
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('converts editor properly', async () => {
    const { getByTestId, getByText, queryByTestId } = setup({});
    const convertButton = getByTestId('mdconvert');
    fireEvent.click(convertButton);
    const confirmButton = getByText('확인');
    fireEvent.click(confirmButton);

    getByTestId('codemirror');
  });
});

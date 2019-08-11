import * as React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import TagInputContainer, {
  TagInputContainerProps,
} from '../TagInputContainer';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';
import { changeTags } from '../../../modules/write';

describe('TagInputContainer', () => {
  const setup = (props: Partial<TagInputContainerProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = render(
      <Provider store={store}>
        <TagInputContainer {...props} />
      </Provider>,
    );
    return {
      ...utils,
      store,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('shows right tags', async () => {
    const utils = setup();
    utils.store.dispatch(changeTags(['태그1', '태그2']));
    await waitForElement(() => utils.getByText('태그1'));
    const tag = utils.getByText('태그1');
    fireEvent.click(tag);
    expect(utils.store.getState().write.tags).toEqual(['태그2']);
  });
});

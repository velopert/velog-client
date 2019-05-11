import * as React from 'react';
import { render } from 'react-testing-library';
import PublishURLSettingContainer, {
  PublishURLSettingContainerProps,
} from '../PublishURLSettingContainer';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';

describe('PublishURLSettingContainer', () => {
  const setup = (props: Partial<PublishURLSettingContainerProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = render(
      <Provider store={store}>
        <PublishURLSettingContainer {...props} />
      </Provider>,
    );
    return {
      ...utils,
    };
  };
  it('', () => {});
});

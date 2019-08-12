import * as React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import PublishScreen, { PublishScreenProps } from '../PublishScreen';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';
import {
  closePublish,
  openPublish,
  setDefaultDescription,
  toggleEditSeries,
} from '../../../modules/write';
import { MockedProvider } from '@apollo/react-testing';
import renderWithProviders from '../../../lib/renderWithProviders';

describe('PublishScreen', () => {
  const setup = (props: Partial<PublishScreenProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = renderWithProviders(
      <MockedProvider>
        <Provider store={store}>
          <PublishScreen {...props} />
        </Provider>
      </MockedProvider>,
    );
    return {
      ...utils,
      store,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('handles visibility properly', () => {
    const utils = setup();
    expect(utils.queryByText('포스트 미리보기')).toBeFalsy();
    utils.store.dispatch(openPublish());
    utils.getByText('포스트 미리보기');
  });
  it('closes PublishScreen when cancel button is clicked', async () => {
    const utils = setup();
    utils.store.dispatch(openPublish());
    utils.getByText('포스트 미리보기');
    const cancelButton = utils.getByText('취소');
    fireEvent.click(cancelButton);
    await wait(() => {
      expect(utils.queryByText('취소')).not.toBeInTheDocument();
    });
  });
  it('shows defaultDescription', () => {
    const utils = setup();
    utils.store.dispatch(openPublish());
    utils.store.dispatch(setDefaultDescription('default'));
  });
  it('calls CHANGE_DESCRIPTION', () => {
    const utils = setup();
    utils.store.dispatch(openPublish());
    const textarea = utils.getByPlaceholderText(
      '당신의 포스트를 짧게 소개해보세요.',
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, {
      target: {
        value: 'helloworld',
      },
    });
    expect(utils.store.getState().write.description).toBe('helloworld');
    expect(textarea.value).toBe('helloworld');
  });
  it('hides PublishSettins when editSeries is true', () => {
    const utils = setup();
    utils.store.dispatch(openPublish());
    utils.store.dispatch(toggleEditSeries());
    const text = utils.queryByText('공개 설정');
    expect(text).toBeFalsy();
  });
});

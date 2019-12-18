import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import AuthModalContainer from '../AuthModalContainer';
import rootReducer, { RootState } from '../../../modules';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { showAuthModal } from '../../../modules/core';

describe('AuthForm', () => {
  const setupStore = () => {
    const store = createStore(rootReducer);
    return store;
  };

  it('renders correctly', () => {
    const store = setupStore();
    store.dispatch(showAuthModal('REGISTER'));
    const { container } = render(
      <Provider store={store}>
        <AuthModalContainer />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('switches mode', async () => {
    const store = setupStore();
    store.dispatch(showAuthModal('REGISTER'));
    const { getByTestId } = render(
      <Provider store={store}>
        <AuthModalContainer />
      </Provider>,
    );
    expect(getByTestId('title')).toHaveTextContent('회원가입');
    fireEvent.click(getByTestId('switchmode'));
    expect(getByTestId('title')).toHaveTextContent('로그인');
  });
});

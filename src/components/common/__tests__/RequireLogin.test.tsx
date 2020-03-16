import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RequireLogin, { RequireLoginProps } from '../RequireLogin';
import renderWithRedux from '../../../lib/renderWithRedux';

describe('RequireLogin', () => {
  const setup = (props: Partial<RequireLoginProps> = {}) => {
    const initialProps: RequireLoginProps = {};
    const utils = renderWithRedux(
      <RequireLogin {...initialProps} {...props} />,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('calls requireLogin on button click', () => {
    const utils = setup();
    const button = utils.getByText('로그인');
    fireEvent.click(button);
    expect(utils.store.getState().core.auth.visible).toBe(true);
  });
  it('has no margin when hasMargin props is omitted', () => {
    const utils = setup();
    expect(utils.container.firstChild).not.toHaveStyle('margin-top: 10rem');
  });
  it('has margin when hasMargin is true', () => {
    const utils = setup({ hasMargin: true });
    expect(utils.container.firstChild).toHaveStyle('margin-top: 10rem');
  });
});

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WriteBackButton, { WriteBackButtonProps } from '../WriteBackButton';

describe('WriteBackButton', () => {
  const setup = (props: Partial<WriteBackButtonProps> = {}) => {
    const initialProps: WriteBackButtonProps = {
      onClick: () => {},
    };
    const utils = render(<WriteBackButton {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('calls onClick', () => {
    const onClick = jest.fn();
    const utils = setup({ onClick });
    const { firstElementChild } = utils.container;
    fireEvent.click(firstElementChild!);
    expect(onClick).toBeCalled();
  });
});

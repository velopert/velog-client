import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VelogAboutRightButton, {
  VelogAboutRightButtonProps,
} from '../VelogAboutRightButton';

describe('VelogAboutRightButton', () => {
  const setup = (props: Partial<VelogAboutRightButtonProps> = {}) => {
    const initialProps: VelogAboutRightButtonProps = {
      edit: false,
      onClick: () => {},
    };
    const utils = render(
      <VelogAboutRightButton {...initialProps} {...props} />,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText } = setup();
    getByText('수정하기');
  });
  it('calls onClick', () => {
    const onClick = jest.fn();
    const { getByText } = setup({
      onClick,
    });
    const button = getByText('수정하기');
    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });
  it('shows save button when edit=true', () => {
    const { getByText } = setup({
      edit: true,
    });
    getByText('저장하기');
  });
});

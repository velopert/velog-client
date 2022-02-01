import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MobileLikeButton, { MobileLikeButtonProps } from '../MobileLikeButton';
import palette from '../../../lib/styles/palette';
import { themedPalette } from '../../../lib/styles/themes';

describe('MobileLikeButton', () => {
  const setup = (props: Partial<MobileLikeButtonProps> = {}) => {
    const initialProps: MobileLikeButtonProps = {
      likes: 0,
      onToggle: () => {},
      liked: false,
    };
    const utils = render(<MobileLikeButton {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });

  it('shows likes value', () => {
    const utils = setup({ likes: 7 });
    utils.getByText('7');
  });

  it('calls onToggle', () => {
    const onToggle = jest.fn();
    const utils = setup({ onToggle });
    const button = utils.getByTestId('like-btn');
    fireEvent.click(button);
    expect(onToggle).toBeCalled();
  });

  it('shows inactive button', () => {
    const utils = setup({ liked: false });
    const button = utils.getByTestId('like-btn');
    // @todo: fixme
    // expect(button).toHaveStyle('background: ${themedPalette.bg_element1}');
  });

  it('shows active button', () => {
    const utils = setup({ liked: true });
    const button = utils.getByTestId('like-btn');
    // @todo: fixme
    // expect(button).toHaveStyle(`background: ${themedPalette.primary2}`);
  });
});

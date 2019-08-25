import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SorterButton, { SorterButtonProps } from '../SorterButton';

describe('SorterButton', () => {
  const setup = (props: Partial<SorterButtonProps> = {}) => {
    const initialProps: SorterButtonProps = {
      value: 1,
      onToggle: () => {},
    };
    const utils = render(<SorterButton {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders asc', () => {
    const { getByText, getByTestId } = setup({
      value: 1,
    });
    getByText('오름차순');
    const arrowIcon = getByTestId('arrow');
    expect(arrowIcon).not.toHaveAttribute('class', 'rotate');
  });

  it('renders desc', () => {
    const { getByText, getByTestId } = setup({
      value: -1,
    });
    getByText('내림차순');
    const arrowIcon = getByTestId('arrow');
    expect(arrowIcon).toHaveAttribute('class', 'rotate');
  });

  it('handles click event', () => {
    const onToggle = jest.fn();
    const { getByText } = setup({
      onToggle,
    });
    fireEvent.click(getByText('오름차순'));
    expect(onToggle).toBeCalled();
  });

  describe('shows custom texts', () => {
    const texts: [string, string] = ['오래된 순', '최신순'];
    it('value=1', () => {
      const { getByText } = setup({
        texts,
      });
      getByText('오래된 순');
    });
    it('value=-1', () => {
      const { getByText } = setup({
        value: -1,
        texts,
      });
      getByText('최신순');
    });
  });
});

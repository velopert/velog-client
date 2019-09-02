import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SeriesActionButtons, {
  SeriesActionButtonsProps,
} from '../SeriesActionButtons';

describe('SeriesActionButtons', () => {
  const setup = (props: Partial<SeriesActionButtonsProps> = {}) => {
    const initialProps: SeriesActionButtonsProps = {
      onEdit: () => {},
      onApply: () => {},
      editing: false,
    };
    const utils = render(<SeriesActionButtons {...initialProps} {...props} />);

    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('calls onEdit', () => {
    const onEdit = jest.fn();
    const { getByText } = setup({
      onEdit,
    });
    const editButton = getByText('수정');
    fireEvent.click(editButton);
    expect(onEdit).toBeCalled();
  });
  it('shows apply button when editing={true}', () => {
    const { getByText } = setup({
      editing: true,
    });
    getByText('적용');
  });
  it('calls onApply', () => {
    const onApply = jest.fn();
    const { getByText } = setup({
      editing: true,
      onApply,
    });
    const applyButton = getByText('적용');
    fireEvent.click(applyButton);
    expect(onApply).toBeCalled();
  });
});

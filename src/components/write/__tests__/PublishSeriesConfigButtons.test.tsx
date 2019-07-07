import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishSeriesConfigButtons, {
  PublishSeriesConfigButtonsProps,
} from '../PublishSeriesConfigButtons';

describe('PublishSeriesConfigButtons', () => {
  const setup = (props: Partial<PublishSeriesConfigButtonsProps> = {}) => {
    const initialProps: PublishSeriesConfigButtonsProps = {
      onCancel: () => {},
      onConfirm: () => {},
      disableConfirm: false,
    };
    const utils = render(
      <PublishSeriesConfigButtons {...initialProps} {...props} />,
    );
    return {
      ...utils,
    };
  };
  it('calls onCancel and onConfirm', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();

    const { getByText } = setup({
      onCancel,
      onConfirm,
    });

    const cancelButton = getByText('취소');
    const confirmButton = getByText('선택하기');

    fireEvent.click(cancelButton);
    expect(onCancel).toBeCalled();

    fireEvent.click(confirmButton);
    expect(onConfirm).toBeCalled();
  });
  it('disables confirm button', () => {
    const { getByText } = setup({
      disableConfirm: true,
    });

    const confirmButton = getByText('선택하기') as HTMLButtonElement;
    expect(confirmButton.disabled).toBe(true);
  });
});

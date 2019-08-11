import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PublishSeriesSection, {
  PublishSeriesSectionProps,
} from '../PublishSeriesSection';

describe('PublishSeriesSection', () => {
  const setup = (props: Partial<PublishSeriesSectionProps> = {}) => {
    const initialProps: PublishSeriesSectionProps = {
      onEdit: () => {},
      selected: null,
    };
    const utils = render(<PublishSeriesSection {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('calls onEditSeries', () => {
    const onEdit = jest.fn();
    const { getByText } = setup({ onEdit });
    const button = getByText('시리즈에 추가하기');
    fireEvent.click(button);
    expect(onEdit).toBeCalled();
  });
  it('shows edit series button when selected', () => {
    const sample = {
      id: '03567f36-d01a-43b2-9006-006f7a9a8d8a',
      name: 'sample series',
    };
    const onEdit = jest.fn();
    const onReset = jest.fn();
    const { getByText, getByTestId } = setup({
      selected: sample,
      onEdit,
      onReset,
    });
    getByText(sample.name);

    const settingButton = getByTestId('setting-button');
    fireEvent.click(settingButton);
    expect(onEdit).toBeCalled();

    const removeButton = getByText('시리즈에서 제거');
    fireEvent.click(removeButton);
    expect(onReset).toBeCalled();
  });
});

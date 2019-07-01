import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishSeriesSection, {
  PublishSeriesSectionProps,
} from '../PublishSeriesSection';

describe('PublishSeriesSection', () => {
  const setup = (props: Partial<PublishSeriesSectionProps> = {}) => {
    const initialProps: PublishSeriesSectionProps = {
      onEdit: () => {},
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
});

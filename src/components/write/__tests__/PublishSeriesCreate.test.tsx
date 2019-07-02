import * as React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import PublishSeriesCreate, {
  PublishSeriesCreateProps,
} from '../PublishSeriesCreate';

describe('PublishSeriesCreate', () => {
  const setup = (props: Partial<PublishSeriesCreateProps> = {}) => {
    const initialProps: PublishSeriesCreateProps = {};
    const utils = render(<PublishSeriesCreate {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };

  it('shows openblock when focused to series input', async () => {
    const { getByText, getByPlaceholderText } = setup();
    const seriesInput = getByPlaceholderText('새로운 시리즈 이름을 입력하세요');
    fireEvent.focus(seriesInput);
    await waitForElement(() => getByText('시리즈 추가'));
  });

  it('handles change event from inputs', () => {});
});

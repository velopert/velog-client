import * as React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved,
} from 'react-testing-library';
import PublishSeriesCreate, {
  PublishSeriesCreateProps,
} from '../PublishSeriesCreate';

describe('PublishSeriesCreate', () => {
  const setup = (props: Partial<PublishSeriesCreateProps> = {}) => {
    const initialProps: PublishSeriesCreateProps = {
      onSubmit: () => {},
      username: 'testuser',
    };
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

  it('handles change event from inputs', async () => {
    const { getByPlaceholderText, getByTestId } = setup();
    const seriesInput = getByPlaceholderText('새로운 시리즈 이름을 입력하세요');
    fireEvent.focus(seriesInput);
    fireEvent.change(seriesInput, {
      target: {
        value: '새로운 시리즈',
      },
    });
    expect(seriesInput).toHaveProperty('value', '새로운 시리즈');
    const urlSlugInput = await waitForElement(() =>
      getByTestId('urlslug-input'),
    );
    expect(urlSlugInput).toHaveProperty('value', '새로운-시리즈');
    fireEvent.change(urlSlugInput, {
      target: {
        value: 'new-series',
      },
    });
    expect(urlSlugInput).toHaveProperty('value', 'new-series');
  });

  it('hides open block when cancel button is clicked', async () => {
    const { getByPlaceholderText, getByText, queryByText } = setup();
    const seriesInput = getByPlaceholderText('새로운 시리즈 이름을 입력하세요');
    fireEvent.focus(seriesInput);
    const cancelButton = await waitForElement(() => getByText('취소'));
    fireEvent.click(cancelButton);
    await waitForElementToBeRemoved(() => queryByText('취소'));
  });

  it('calls onSubmit', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = setup({ onSubmit });
    const seriesInput = getByPlaceholderText('새로운 시리즈 이름을 입력하세요');
    fireEvent.focus(seriesInput);
    fireEvent.change(seriesInput, {
      target: {
        value: '새로운 시리즈',
      },
    });
    expect(seriesInput).toHaveProperty('value', '새로운 시리즈');
    const createSeriesButton = await waitForElement(() =>
      getByText('시리즈 추가'),
    );
    fireEvent.click(createSeriesButton);
    expect(onSubmit).toHaveBeenCalledWith({
      name: '새로운 시리즈',
      urlSlug: '새로운-시리즈',
    });
  });

  it('shows username recevied via props', async () => {
    const { getByPlaceholderText, getByText } = setup({
      username: 'helloworld',
    });
    const seriesInput = getByPlaceholderText('새로운 시리즈 이름을 입력하세요');
    fireEvent.focus(seriesInput);
    await waitForElement(() => getByText(`/@helloworld/series/`));
  });
});

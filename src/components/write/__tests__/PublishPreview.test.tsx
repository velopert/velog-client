import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishPreview, { PublishPreviewProps } from '../PublishPreview';

describe('PublishPreview', () => {
  const setup = (props: Partial<PublishPreviewProps> = {}) => {
    const initialProps: PublishPreviewProps = {
      title: '타이틀',
      description: '',
      defaultDescription: '',
      onChangeDescription: () => {},
    };
    const utils = render(<PublishPreview {...initialProps} {...props} />);
    const textarea = utils.getByPlaceholderText(
      '당신의 포스트를 짧게 소개해보세요.',
    ) as HTMLTextAreaElement;
    return {
      textarea,
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('renders title', () => {
    const utils = setup({ title: '타이틀 입니다.' });
    utils.getByText('타이틀 입니다.');
  });
  it('shows default description', () => {
    const utils = setup({
      defaultDescription: 'default',
    });
    expect(utils.textarea.value).toBe('default');
  });
  it('shows description', () => {
    const utils = setup({
      description: 'hello',
      defaultDescription: 'default',
    });
    expect(utils.textarea.value).toBe('hello');
  });
  it('calls onChangeDescription', () => {
    const onChangeDescription = jest.fn();
    const utils = setup({
      onChangeDescription,
    });
    fireEvent.change(utils.textarea, {
      target: {
        value: 'hello there',
      },
    });
    expect(onChangeDescription).toBeCalledWith('hello there');
  });
  it('shows the right length', () => {
    const utils = setup({ description: 'onetwothree' });
    utils.getByText('11/150');
  });
});

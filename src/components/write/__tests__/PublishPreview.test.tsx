import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PublishPreview, { PublishPreviewProps } from '../PublishPreview';

describe('PublishPreview', () => {
  const setup = (props: Partial<PublishPreviewProps> = {}) => {
    const initialProps: PublishPreviewProps = {
      title: '타이틀',
      description: '',
      defaultDescription: '',
      onChangeDescription: () => {},
      onResetThumbnail: () => {},
      onUpload: () => {},
      thumbnail: null,
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
  it('text limit turns red', () => {
    const longDescription = new Array(150).fill('a').join('');
    const utils = setup({ description: longDescription });
    const textLimitDiv = utils.getByText('150/150');
    expect(window.getComputedStyle(textLimitDiv).color).toBe(
      'rgb(250, 82, 82)',
    );
  });
  it('calls onUpload', () => {
    const onUpload = jest.fn();
    const utils = setup({ onUpload });
    const uploadButton = utils.getByText('썸네일 업로드');
    fireEvent.click(uploadButton);
    expect(onUpload).toBeCalled();
  });
  it('shows a thumbnail', () => {
    const utils = setup({ thumbnail: 'https://images.velog.io/sample.png' });
    const image = utils.getByTestId('image') as HTMLImageElement;
    expect(image).toHaveAttribute('src', 'https://images.velog.io/sample.png');
    utils.getByText('재업로드');
    utils.getByText('제거');
  });
});

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PostCommentsWrite, {
  PostCommentsWriteProps,
} from '../PostCommentsWrite';

describe('PostCommentsWrite', () => {
  const setup = (props: Partial<PostCommentsWriteProps> = {}) => {
    const initialProps: PostCommentsWriteProps = {
      comment: 'hello world',
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {},
      onWrite: () => {},
    };
    const utils = render(<PostCommentsWrite {...initialProps} {...props} />);

    const textarea = utils.getByPlaceholderText(
      '댓글을 작성하세요',
    ) as HTMLTextAreaElement;
    const writeButton = utils.getByText(/댓글 (작성|수정)/);
    return {
      textarea,
      writeButton,
      ...utils,
    };
  };
  it('renders textarea and a button, but not cancel button', () => {
    const { textarea, writeButton, queryByText } = setup();
    expect(textarea).toBeVisible();
    expect(writeButton).toBeVisible();
    const cancelButton = queryByText('취소');
    expect(cancelButton).toBeFalsy();
  });
  it('shows value on textarea', () => {
    const { textarea } = setup();
    expect(textarea.value).toBe('hello world');
  });
  it('calls onChange and onWrite functions', () => {
    const onChange = jest.fn();
    const onWrite = jest.fn();
    const { textarea, writeButton } = setup({ onChange, onWrite });

    const changeEvent = {
      target: {
        value: 'hello world!',
      },
    };

    fireEvent.change(textarea, changeEvent);

    expect(onChange).toBeCalled();

    fireEvent.click(writeButton);

    expect(onWrite).toBeCalled();
  });
  it('shows cancel button when onCancel exists', () => {
    const { getByText } = setup({ onCancel: () => {} });
    getByText('취소');
  });
  it('calls onCancel', () => {
    const onCancel = jest.fn();
    const { getByText } = setup({ onCancel });
    fireEvent.click(getByText('취소'));
    expect(onCancel).toBeCalled();
  });
  it('shows edit text when edit is true', () => {
    const { writeButton } = setup({ edit: true });
    expect(writeButton.textContent).toBe('댓글 수정');
  });
});

import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
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
    const writeButton = utils.getByText('댓글 작성');
    return {
      textarea,
      writeButton,
      ...utils,
    };
  };
  it('renders textarea and a button', () => {
    const { textarea, writeButton } = setup();
    expect(textarea).toBeVisible();
    expect(writeButton).toBeVisible();
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
});

import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PostCommentsWriteContainer, {
  PostCommentsWriteContainerProps,
} from '../PostCommentsWriteContainer';

describe('PostCommentsWriteContainer', () => {
  const setup = (props: Partial<PostCommentsWriteContainerProps> = {}) => {
    const initialProps: PostCommentsWriteContainerProps = {};
    const utils = render(
      <PostCommentsWriteContainer {...initialProps} {...props} />,
    );

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
  it('changes textarea', () => {
    const { textarea } = setup();
    fireEvent.change(textarea, {
      target: {
        value: 'hello',
      },
    });
    expect(textarea.value).toBe('hello');
  });
});

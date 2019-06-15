import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PostCommentsWriteContainer, {
  PostCommentsWriteContainerProps,
} from '../PostCommentsWriteContainer';
import { MockedProvider } from 'react-apollo/test-utils';

describe('PostCommentsWriteContainer', () => {
  const setup = (props: Partial<PostCommentsWriteContainerProps> = {}) => {
    const initialProps: PostCommentsWriteContainerProps = {
      postId: 'd91aa54b-0e2c-4a18-9104-ec32ea7218a3',
    };
    const utils = render(
      <MockedProvider>
        <PostCommentsWriteContainer {...initialProps} {...props} />
      </MockedProvider>,
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

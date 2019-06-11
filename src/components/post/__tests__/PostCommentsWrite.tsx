import * as React from 'react';
import { render } from 'react-testing-library';
import PostCommentsWrite, {
  PostCommentsWriteProps,
} from '../PostCommentsWrite';

describe('PostCommentsWrite', () => {
  const setup = (props: Partial<PostCommentsWriteProps> = {}) => {
    const initialProps: PostCommentsWriteProps = {};
    const utils = render(<PostCommentsWrite {...initialProps} {...props} />);

    const textarea = utils.getByPlaceholderText('댓글을 작성하세요');
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
});

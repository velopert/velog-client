import * as React from 'react';
import { render } from '@testing-library/react';
import PostCommentsTemplate, {
  PostCommentsTemplateProps,
} from '../PostCommentsTemplate';

describe('PostCommentsTemplate', () => {
  const setup = (props: Partial<PostCommentsTemplateProps> = {}) => {
    const initialProps: PostCommentsTemplateProps = {
      count: 9,
    };
    const utils = render(
      <PostCommentsTemplate {...initialProps} {...props}>
        contents
      </PostCommentsTemplate>,
    );
    return {
      ...utils,
    };
  };
  it('shows comments count and children', () => {
    const { getByText } = setup();
    getByText('9개의 댓글');
    getByText('contents');
  });
});

import * as React from 'react';
import { render } from 'react-testing-library';
import PostContent, { PostContentProps } from '../PostContent';

describe('PostContent', () => {
  const setup = (props: Partial<PostContentProps> = {}) => {
    const initialProps: PostContentProps = {
      isMarkdown: true,
      body: '# Hello World!\n안녕하세요.',
    };
    const utils = render(<PostContent {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders markdown post', () => {
    const { getByText } = setup();
    getByText('Hello World!');
    getByText('안녕하세요.');
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import PostContent, { PostContentProps } from '../PostContent';
import PostViewerProvider from '../PostViewerProvider';
import { HelmetProvider } from 'react-helmet-async';

describe('PostContent', () => {
  const setup = (props: Partial<PostContentProps> = {}) => {
    const initialProps: PostContentProps = {
      isMarkdown: true,
      body: '# Hello World!\n안녕하세요.',
    };
    const utils = render(
      <HelmetProvider>
        <PostViewerProvider prefetchLinkedPosts={() => {}}>
          <PostContent {...initialProps} {...props} />
        </PostViewerProvider>
      </HelmetProvider>,
    );
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

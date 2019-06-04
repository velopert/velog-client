import * as React from 'react';
import { render } from 'react-testing-library';
import PostHead, { PostHeadProps } from '../PostHead';

describe('PostHead', () => {
  const setup = (props: Partial<PostHeadProps> = {}) => {
    const initialProps: PostHeadProps = {
      title: 'title',
      tags: ['tagA', 'tagB'],
      username: 'velopert',
      date: new Date(Date.now() - 1000 * 60 * 60 * 5).toString(),
    };
    const utils = render(<PostHead {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders title', () => {
    const { getByText } = setup();
    getByText('title');
  });
  it('renders username', () => {
    const { getByText } = setup();
    getByText('velopert');
  });
  it('renders date', () => {});

  it('renders tags', () => {});
});

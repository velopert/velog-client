import * as React from 'react';
import { render } from 'react-testing-library';
import LinkedPostList, { LinkedPostListProps } from '../LinkedPostList';

describe('LinkedPostList', () => {
  const setup = (props: Partial<LinkedPostListProps> = {}) => {
    const initialProps: LinkedPostListProps = {
      linkedPosts: {
        previous: {
          id: 'a5063709-945e-4d93-a494-16ad5a881a61',
          title: '1',
          url_slug: '1',
          user: {
            id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
            username: 'blablabla',
          },
        },
        next: {
          id: '6a996a6b-4a55-4049-bee2-a9a0b504283c',
          title: '3',
          url_slug: '3',
          user: {
            id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
            username: 'blablabla',
          },
        },
      },
    };

    const utils = render(<LinkedPostList {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
});

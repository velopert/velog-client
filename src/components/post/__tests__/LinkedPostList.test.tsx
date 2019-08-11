import * as React from 'react';
import { render } from 'react-testing-library';
import LinkedPostList, { LinkedPostListProps } from '../LinkedPostList';
import { MemoryRouter } from 'react-router';

describe('LinkedPostList', () => {
  const setup = (props: Partial<LinkedPostListProps> = {}) => {
    const initialProps: LinkedPostListProps = {
      linkedPosts: {
        previous: {
          id: 'a5063709-945e-4d93-a494-16ad5a881a61',
          title: 'prevPost',
          url_slug: '1',
          user: {
            id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
            username: 'blablabla',
          },
        },
        next: {
          id: '6a996a6b-4a55-4049-bee2-a9a0b504283c',
          title: 'nextPost',
          url_slug: '3',
          user: {
            id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
            username: 'blablabla',
          },
        },
      },
    };

    const utils = render(
      <MemoryRouter>
        <LinkedPostList {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('has both posts', () => {
    const { getByText } = setup();
    getByText('prevPost');
    getByText('nextPost');
  });
  it('has no post', () => {
    const { queryByText } = setup({
      linkedPosts: {
        next: null,
        previous: null,
      },
    });
    const prev = queryByText('이전 포스트');
    const next = queryByText('다음 포스트');
    expect(prev).not.toBeInTheDocument();
    expect(next).not.toBeInTheDocument();
  });
  it('has prev post only', () => {
    const { getByText, queryByText } = setup({
      linkedPosts: {
        previous: {
          id: 'a5063709-945e-4d93-a494-16ad5a881a61',
          title: 'prevPost',
          url_slug: '1',
          user: {
            id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
            username: 'blablabla',
          },
        },
        next: null,
      },
    });
    getByText('prevPost');
    expect(queryByText('nextPost')).not.toBeInTheDocument();
  });
  it('has next post only', () => {
    const { getByText, queryByText } = setup({
      linkedPosts: {
        previous: null,
        next: {
          id: 'a5063709-945e-4d93-a494-16ad5a881a61',
          title: 'nextPost',
          url_slug: '1',
          user: {
            id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
            username: 'blablabla',
          },
        },
      },
    });
    getByText('nextPost');
    expect(queryByText('prevPost')).not.toBeInTheDocument();
  });
});

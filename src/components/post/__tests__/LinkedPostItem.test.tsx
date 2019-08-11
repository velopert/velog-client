import * as React from 'react';
import { render } from 'react-testing-library';
import LinkedPostItem, { LinkedPostItemProps } from '../LinkedPostItem';
import { MemoryRouter } from 'react-router';

describe('LinkedPostItem', () => {
  const setup = (props: Partial<LinkedPostItemProps> = {}) => {
    const initialProps: LinkedPostItemProps = {
      linkedPost: {
        id: 'a5063709-945e-4d93-a494-16ad5a881a61',
        title: 'Post Title',
        url_slug: 'urlSlug',
        user: {
          id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
          username: 'blablabla',
        },
      },
    };
    const utils = render(
      <MemoryRouter>
        <LinkedPostItem {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText } = setup();
    getByText('Post Title');
    getByText('이전 포스트');
  });
  it('has proper link href', () => {
    const { container } = setup();
    const a = container.childNodes[0] as HTMLAnchorElement;
    expect(a).toBeTruthy();
    expect(a).toHaveAttribute('href', '/@blablabla/urlSlug');
  });
  it('is next post', () => {
    const { getByText } = setup({
      right: true,
    });
    getByText('다음 포스트');
  });
  it('is missing', () => {
    const { container } = setup({
      linkedPost: null,
    });
    expect(container.hasChildNodes()).toBe(false);
  });
});

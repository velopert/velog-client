import * as React from 'react';
import { render } from '@testing-library/react';
import PostTags, { PostTagsProps } from '../PostTags';
import { MemoryRouter } from 'react-router-dom';

describe('PostTags', () => {
  const setup = (props: Partial<PostTagsProps> = {}) => {
    const initialProps: PostTagsProps = {
      tags: ['태그1', '태그2'],
    };
    const utils = render(
      <MemoryRouter>
        <PostTags {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders tags', () => {
    const { getByText } = setup();
    const tag1 = getByText('태그1');
    expect(tag1).toHaveAttribute('href', '/tags/태그1');
    getByText('태그2');
  });
});

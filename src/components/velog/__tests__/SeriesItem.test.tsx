import * as React from 'react';
import { render } from '@testing-library/react';
import SeriesItem, { SeriesItemProps } from '../SeriesItem';
import { formatDate } from '../../../lib/utils';
import { MemoryRouter } from 'react-router';

describe('SeriesItem', () => {
  const setup = (props: Partial<SeriesItemProps> = {}) => {
    const initialProps: SeriesItemProps = {
      thumbnail: null,
      name: '시리즈 이름',
      postsCount: 5,
      lastUpdate: '2019-08-21T14:27:30.629Z',
      username: 'velopert',
      urlSlug: 'sample-url-slug',
    };
    const utils = render(
      <MemoryRouter>
        <SeriesItem {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText } = setup();
    getByText('시리즈 이름');
    getByText('5개의 포스트');
    getByText(`마지막 업데이트 ${formatDate('2019-08-21T14:27:30.629Z')}`);
  });
});

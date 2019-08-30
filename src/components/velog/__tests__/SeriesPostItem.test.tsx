import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import SeriesPostItem, { SeriesPostItemProps } from '../SeriesPostItem';
import { seriesData } from '../../../lib/graphql/__data__/series.data';
import renderWithProviders from '../../../lib/renderWithProviders';

const [{ post: firstPost }] = seriesData.series.series_posts;

describe('SeriesPostItem', () => {
  const setup = (props: Partial<SeriesPostItemProps> = {}) => {
    const initialProps: SeriesPostItemProps = {
      date: firstPost.released_at,
      description: firstPost.short_description,
      thumbnail: firstPost.thumbnail,
      title: firstPost.title,
      urlSlug: firstPost.url_slug,
      username: 'velopert',
      index: 1,
    };
    const utils = renderWithProviders(
      <SeriesPostItem {...initialProps} {...props} />,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText, history } = setup();
    const a = getByText(firstPost.title) as HTMLAnchorElement;
    fireEvent.click(a);
    expect(history.location.pathname).toBe('/@velopert/redux-or-mobx');
    getByText(/리액트 생태계에서 사용되는/);
  });
});

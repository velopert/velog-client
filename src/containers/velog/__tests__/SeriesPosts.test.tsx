import * as React from 'react';
import SeriesPosts, { SeriesPostsProps } from '../SeriesPosts';
import renderWithProviders from '../../../lib/renderWithProviders';
import { GET_SERIES } from '../../../lib/graphql/series';
import { seriesData } from '../../../lib/graphql/__data__/series.data';
import { waitForElement } from '@testing-library/react';

describe('SeriesPosts', () => {
  const setup = (props: Partial<SeriesPostsProps> = {}) => {
    const initialProps: SeriesPostsProps = {
      username: 'velopert',
      urlSlug: 'redux-or-mobx',
    };
    const utils = renderWithProviders(
      <SeriesPosts {...initialProps} {...props} />,
      {
        mocks: [
          {
            request: {
              query: GET_SERIES,
              variables: {
                username: 'velopert',
                url_slug: 'redux-or-mobx',
              },
            },
            result: {
              data: seriesData,
            },
          },
        ],
      },
    );
    return {
      ...utils,
    };
  };
  it('renders properly', async () => {
    const { getByText } = setup();
    await waitForElement(() => getByText('Redux 또는 MobX 를 통한 상태 관리'));
  });
});

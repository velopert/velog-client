import * as React from 'react';
import { render } from '@testing-library/react';
import SeriesList, { SeriesListProps } from '../SeriesList';
import { userSeriesListData } from '../../../lib/graphql/__data__/user.data';
import { MemoryRouter } from 'react-router';

describe('SeriesList', () => {
  const setup = (props: Partial<SeriesListProps> = {}) => {
    const initialProps: SeriesListProps = {
      username: 'velopert',
      list: userSeriesListData.user.series_list,
    };
    const utils = render(
      <MemoryRouter>
        <SeriesList {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText } = setup();
    getByText('sample-series');
    getByText('ㅋㅋㅋㅋㅋ');
    getByText('ㅅㄹㅈ');
    getByText('zxcvxcvxcvzxcv');
  });
});

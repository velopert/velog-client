import * as React from 'react';
import { render, waitForElement } from '@testing-library/react';
import SeriesListContainer, {
  SeriesListContainerProps,
} from '../SeriesListContainer';
import renderWithProviders from '../../../lib/renderWithProviders';
import { GET_USER_SERIES_LIST } from '../../../lib/graphql/user';
import { userSeriesListData } from '../../../lib/graphql/__data__/user.data';

describe('SeriesListContainer', () => {
  const setup = (props: Partial<SeriesListContainerProps> = {}) => {
    const initialProps: SeriesListContainerProps = {
      username: 'velopert',
    };

    const mocks = [
      {
        request: {
          query: GET_USER_SERIES_LIST,
          variables: {
            username: 'velopert',
          },
        },
        result: {
          data: userSeriesListData,
        },
      },
    ];

    const utils = renderWithProviders(
      <SeriesListContainer {...initialProps} {...props} />,
      { mocks },
    );
    return {
      ...utils,
    };
  };
  it('renders properly', async () => {
    const { getByText } = setup();
    await waitForElement(() => getByText('ㅅㄹㅈ'));
  });
});

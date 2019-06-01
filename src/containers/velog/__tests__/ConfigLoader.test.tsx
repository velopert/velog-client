import * as React from 'react';
import { render, waitForDomChange } from 'react-testing-library';
import ConfigLoader, { ConfigLoaderProps } from '../ConfigLoader';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_VELOG_CONFIG } from '../../../lib/graphql/user';
import renderWithRedux from '../../../lib/renderWithRedux';
import waitUntil from '../../../lib/waitUntil';

describe('ConfigLoader', () => {
  const setup = (props: Partial<ConfigLoaderProps> = {}) => {
    const initialProps: ConfigLoaderProps = { username: 'velopert' };
    const mocks = [
      {
        request: {
          query: GET_VELOG_CONFIG,
          variables: {
            username: 'velopert',
          },
        },
        result: {
          data: {
            velog_config: { title: 'VELOPERT.LOG', logo_image: null },
          },
        },
      },
    ];
    const utils = renderWithRedux(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ConfigLoader {...initialProps} {...props} />
      </MockedProvider>,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('loads GET_VELOG_CONFIG and dispatches setUserLogo', async () => {
    const { store } = setup();
    const userLogo = store.getState().header.userLogo;
    await waitUntil(() => store.getState().header.userLogo !== userLogo);
    expect(store.getState().header.userLogo).toHaveProperty(
      'title',
      'VELOPERT.LOG',
    );
  });
});

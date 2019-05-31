import * as React from 'react';
import { render, waitForDomChange } from 'react-testing-library';
import ConfigLoader, { ConfigLoaderProps } from '../ConfigLoader';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_VELOG_CONFIG } from '../../../lib/graphql/user';

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
    const utils = render(
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
  it('matches snapshot', async () => {
    const { container } = setup();
    await waitForDomChange({ container });
    expect(container).toMatchSnapshot();
  });
});

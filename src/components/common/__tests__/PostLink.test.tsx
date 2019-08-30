import * as React from 'react';
import PostLink, { PostLinkProps } from '../PostLink';
import renderWithProviders from '../../../lib/renderWithProviders';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import { READ_POST } from '../../../lib/graphql/post';
import { postData } from '../../../lib/graphql/__data__/post.data';

describe('PostLink', () => {
  const setup = (props: Partial<PostLinkProps> = {}) => {
    const initialProps: PostLinkProps = {
      username: 'velopert',
      urlSlug: 'redux-or-mobx',
      children: '리덕스와 MobX',
    };
    const history = createMemoryHistory();
    const utils = renderWithProviders(
      <PostLink {...initialProps} {...props} />,
      {
        routeOptions: {
          route: '/',
          history,
        },
        mocks: [
          {
            request: {
              query: READ_POST,
              variables: {
                username: 'velopert',
                url_slug: 'redux-or-mobx',
              },
            },
            result: {
              data: postData,
            },
          },
        ],
      },
    );
    return {
      ...utils,
      history,
    };
  };
  it('renders link', () => {
    const { getByText, history } = setup();
    const a = getByText('리덕스와 MobX');
    fireEvent.click(a);
    expect(history.location.pathname).toBe('/@velopert/redux-or-mobx');
  });

  it('prefetches post', () => {
    const { getByText } = setup();
    const a = getByText('리덕스와 MobX');
    fireEvent.mouseOver(a);
    // this is hard to test...
  });
});

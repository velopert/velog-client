import * as React from 'react';
import { waitForElement } from '@testing-library/react';
import PostViewer, { PostViewerProps, PostViewerOwnProps } from '../PostViewer';
import { MemoryRouter } from 'react-router-dom';
import { READ_POST } from '../../../lib/graphql/post';
import renderWithRedux from '../../../lib/renderWithRedux';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { MockLink, MockedResponse } from 'apollo-link-mock';
import { ApolloProvider } from '@apollo/react-hooks';

function createClient(mocks: MockedResponse[]) {
  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: new MockLink(mocks),
  });
}

const samplePost = {
  id: '6533da20-b351-11e8-9696-f1fffe8a36f1',
  title: '제목입니다',
  released_at: '2018-09-08T10:24:40.642Z',
  updated_at: '2019-01-28T13:51:10.999Z',
  tags: ['react', 'redux'],
  body: '내용입니다',
  is_markdown: true,
  is_private: false,
  is_temp: false,
  short_description: 'blablabla',
  url_slug: 'jeeemok',
  likes: 0,
  liked: false,
  thumbnail:
    'https://images.velog.io/post-images/velopert/654650b0-b351-11e8-9696-f1fffe8a36f1/redux.png',
  user: {
    id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
    username: 'velopert',
    profile: {
      id: 'mockid',
      display_name: 'Minjun Kim',
      thumbnail:
        'https://images.velog.io/profiles/velopert/thumbnails/1536400727.98.png',
      short_bio: 'velopert@Laftel Inc. 재미있는것만 골라서 하는 개발자입니다.',
      profile_links: {
        github: 'velopert',
      },
    },
    velog_config: {
      id: '5ad9f60b-4b95-42e9-a32c-eae222c79bf1',
      title: 'VELOPERT.LOG',
    },
  },
  comments_count: 2,
  comments: [
    {
      id: '70d24d3b-a6ce-46a3-86c5-1cba95843841',
      user: {
        id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
        username: 'blablabla',
        profile: {
          id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8-profile',
          thumbnail: null,
        },
      },
      text: 'Hey there',
      replies_count: 0,
      created_at: '2019-06-13T14:27:25.463Z',
      level: 0,
      deleted: false,
    },
    {
      id: '0f700ebd-0dec-469a-adb8-c47bae2b8f18',
      user: {
        id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
        username: 'blablabla',
        profile: {
          id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8-profile',
          thumbnail: null,
        },
      },
      text: 'Hey there',
      replies_count: 0,
      created_at: '2019-06-13T14:27:31.265Z',
      level: 0,
      deleted: false,
    },
  ],
  series: null,
  linked_posts: {
    previous: null,
    next: null,
  },
};

describe('PostViewer', () => {
  const setup = (props: Partial<PostViewerProps> = {}, overrideMocks?: any) => {
    const initialProps: PostViewerOwnProps = {
      username: 'velopert',
      urlSlug: 'sample',
    };

    const client = createClient(overrideMocks || []);

    const utils = renderWithRedux(
      <ApolloProvider client={client}>
        <MemoryRouter>
          <PostViewer {...initialProps} {...props} />
        </MemoryRouter>
      </ApolloProvider>,
    );
    return {
      ...utils,
    };
  };
  it('renders post correctly', async () => {
    const { getByText, getByAltText } = setup({}, [
      {
        request: {
          query: READ_POST,
          variables: {
            username: 'velopert',
            url_slug: 'sample',
          },
        },
        result: {
          data: {
            post: samplePost,
          },
        },
      },
    ]);
    await waitForElement(() => getByText('제목입니다'));
    waitForElement(() => getByAltText('post-thumbnail'));
  });
  it('hides thumbnail if exists in body', async () => {
    const { getByText, queryByAltText } = setup({}, [
      {
        request: {
          query: READ_POST,
          variables: {
            username: 'velopert',
            url_slug: 'sample',
          },
        },
        result: {
          data: {
            post: {
              ...samplePost,
              body:
                '내용입니다 ![](https://images.velog.io/post-images/velopert/654650b0-b351-11e8-9696-f1fffe8a36f1/redux.png)',
            },
          },
        },
      },
    ]);
    await waitForElement(() => getByText('제목입니다'));
    const thumbnail = queryByAltText('post-thumbnail');
    expect(thumbnail).toBeFalsy();
  });
});

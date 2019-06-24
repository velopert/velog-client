import * as React from 'react';
import { render, waitForElement } from 'react-testing-library';
import PostViewer, { PostViewerProps } from '../PostViewer';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { READ_POST } from '../../../lib/graphql/post';
import renderWithRedux from '../../../lib/renderWithRedux';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { MockLink, MockedResponse } from 'apollo-link-mock';
import { ApolloProvider } from 'react-apollo-hooks';

function createClient(mocks: MockedResponse[]) {
  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: new MockLink(mocks),
  });
}

describe('PostViewer', () => {
  const setup = (props: Partial<PostViewerProps> = {}, overrideMocks?: any) => {
    const initialProps: PostViewerProps = {
      username: 'velopert',
      urlSlug: 'sample',
    };
    const mocks = [
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
              id: '6533da20-b351-11e8-9696-f1fffe8a36f1',
              title: '제목입니다',
              released_at: '2018-09-08T10:24:40.642Z',
              updated_at: '2019-01-28T13:51:10.999Z',
              tags: ['react', 'redux'],
              body: '내용입니다',
              is_markdown: true,
              is_private: false,
              is_temp: false,
              thumbnail:
                'https://images.velog.io/post-images/velopert/654650b0-b351-11e8-9696-f1fffe8a36f1/redux.png',
              user: {
                id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
                username: 'velopert',
                profile: {
                  display_name: 'Minjun Kim',
                  thumbnail:
                    'https://images.velog.io/profiles/velopert/thumbnails/1536400727.98.png',
                  short_bio:
                    'velopert@Laftel Inc. 재미있는것만 골라서 하는 개발자입니다.',
                },
                velog_config: {
                  id: '5ad9f60b-4b95-42e9-a32c-eae222c79bf1',
                  title: 'VELOPERT.LOG',
                },
              },
              comments: [
                {
                  id: '70d24d3b-a6ce-46a3-86c5-1cba95843841',
                  user: {
                    id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
                    username: 'blablabla',
                    profile: {
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
                      thumbnail: null,
                    },
                  },
                  text: 'Hey there',
                  replies_count: 0,
                  created_at: '2019-06-13T14:27:31.265Z',
                  level: 0,
                  deleted: false,
                },
                {
                  id: '90f3b558-4af3-41bb-95dd-ed9571609f25',
                  user: {
                    id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
                    username: 'blablabla',
                    profile: {
                      thumbnail: null,
                    },
                  },
                  text: 'Hey there',
                  replies_count: 0,
                  created_at: '2019-06-13T14:27:53.898Z',
                  level: 0,
                  deleted: false,
                },
                {
                  id: 'd4365762-08e8-4928-a387-4255e4392291',
                  user: {
                    id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
                    username: 'blablabla',
                    profile: {
                      thumbnail: null,
                    },
                  },
                  text: 'Hey there',
                  replies_count: 3,
                  created_at: '2019-06-13T14:42:28.873Z',
                  level: 0,
                  deleted: false,
                },
                {
                  id: '383d590d-d3ed-4f07-994e-cbea3127195d',
                  user: {
                    id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
                    username: 'blablabla',
                    profile: {
                      thumbnail: null,
                    },
                  },
                  text: 'Hey there',
                  replies_count: 0,
                  created_at: '2019-06-13T14:42:58.100Z',
                  level: 0,
                  deleted: false,
                },
                {
                  id: 'a0bc6974-582a-4eb1-8273-627e1df7c527',
                  user: {
                    id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
                    username: 'blablabla',
                    profile: {
                      thumbnail: null,
                    },
                  },
                  text: 'aw3b5aw35w35bw3a',
                  replies_count: 0,
                  created_at: '2019-06-14T14:43:22.312Z',
                  level: 0,
                  deleted: false,
                },
                {
                  id: '86fa0b3f-1493-424c-aff4-49e1b059caf6',
                  user: {
                    id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
                    username: 'blablabla',
                    profile: {
                      thumbnail: null,
                    },
                  },
                  text: '잘된거니?',
                  replies_count: 0,
                  created_at: '2019-06-14T14:43:27.840Z',
                  level: 0,
                  deleted: false,
                },
                {
                  id: '4e76da59-048a-4d2d-b11f-4f6194dff4f5',
                  user: {
                    id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
                    username: 'blablabla',
                    profile: {
                      thumbnail: null,
                    },
                  },
                  text: 'afasdfsdf',
                  replies_count: 0,
                  created_at: '2019-06-14T14:49:08.871Z',
                  level: 0,
                  deleted: false,
                },
              ],
            },
          },
        },
      },
    ];

    const client = createClient([]);

    const utils = renderWithRedux(
      <MockedProvider mocks={overrideMocks || mocks} addTypename={false}>
        <ApolloProvider client={client}>
          <MemoryRouter>
            <PostViewer {...initialProps} {...props} />
          </MemoryRouter>
        </ApolloProvider>
      </MockedProvider>,
    );
    return {
      ...utils,
    };
  };
  it('renders post correctly', async () => {
    const { getByText, getByAltText } = setup();
    await waitForElement(() => getByText('제목입니다'));
    waitForElement(() => getByAltText('post-thumbnail'));
  });
  it('hides thumbnail if exists in body', async () => {
    const mocks = [
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
              id: '6533da20-b351-11e8-9696-f1fffe8a36f1',
              title: '제목입니다',
              released_at: '2018-09-08T10:24:40.642Z',
              updated_at: '2019-01-28T13:51:10.999Z',
              tags: ['react', 'redux'],
              body:
                '내용입니다 ![](https://images.velog.io/post-images/velopert/654650b0-b351-11e8-9696-f1fffe8a36f1/redux.png)',
              is_markdown: true,
              is_private: false,
              is_temp: false,
              thumbnail:
                'https://images.velog.io/post-images/velopert/654650b0-b351-11e8-9696-f1fffe8a36f1/redux.png',
              user: {
                id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
                username: 'velopert',
                profile: {
                  display_name: 'Minjun Kim',
                  thumbnail:
                    'https://images.velog.io/profiles/velopert/thumbnails/1536400727.98.png',
                  short_bio:
                    'velopert@Laftel Inc. 재미있는것만 골라서 하는 개발자입니다.',
                },
                velog_config: {
                  id: '5ad9f60b-4b95-42e9-a32c-eae222c79bf1',
                  title: 'VELOPERT.LOG',
                },
              },
              comments: [],
            },
          },
        },
      },
    ];
    const { getByText, queryByAltText } = setup(undefined, mocks);
    await waitForElement(() => getByText('제목입니다'));
    const thumbnail = queryByAltText('post-thumbnail');
    expect(thumbnail).toBeFalsy();
  });
});

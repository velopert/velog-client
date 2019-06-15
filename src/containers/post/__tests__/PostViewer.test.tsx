import * as React from 'react';
import { render, waitForElement } from 'react-testing-library';
import PostViewer, { PostViewerProps } from '../PostViewer';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { READ_POST } from '../../../lib/graphql/post';

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
              comments_count: 8,
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
                },
              ],
            },
          },
        },
      },
    ];
    const utils = render(
      <MockedProvider mocks={overrideMocks || mocks} addTypename={false}>
        <MemoryRouter>
          <PostViewer {...initialProps} {...props} />
        </MemoryRouter>
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

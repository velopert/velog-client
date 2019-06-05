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

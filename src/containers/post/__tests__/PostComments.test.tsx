import * as React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  queryByText,
} from '@testing-library/react';
import PostComments, { PostCommentsProps } from '../PostComments';
import {
  Comment,
  REMOVE_COMMENT,
  RELOAD_COMMENTS,
} from '../../../lib/graphql/post';
import renderWithRedux from '../../../lib/renderWithRedux';
import { ApolloProvider } from 'react-apollo-hooks';
import { createClient } from '../../../lib/renderWithApollo';
import { MockedProvider } from '@apollo/react-testing';
import { setUser } from '../../../modules/core';

const sampleComments: Comment[] = [
  {
    id: '70d24d3b-a6ce-46a3-86c5-1cba95843841',
    user: {
      id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
      username: 'blablabla',
      profile: {
        thumbnail: null,
      },
    },
    text: 'RemoveMe',
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
];
describe('PostComments', () => {
  const setup = (props: Partial<PostCommentsProps> = {}) => {
    const initialProps: PostCommentsProps = {
      comments: sampleComments,
      count: 3,
      postId: '6533da20-b351-11e8-9696-f1fffe8a36f1',
    };
    const client = createClient([
      {
        request: {
          query: REMOVE_COMMENT,
          variables: {
            id: '70d24d3b-a6ce-46a3-86c5-1cba95843841',
          },
        },
        result: {
          data: {
            removeComment: true,
          },
        },
      },
      {
        request: {
          query: RELOAD_COMMENTS,
          variables: {
            id: '6533da20-b351-11e8-9696-f1fffe8a36f1',
          },
        },
        result: {
          data: {
            post: {
              id: '6533da20-b351-11e8-9696-f1fffe8a36f1',
              comments_count: 2,
              comments: sampleComments.slice(1, sampleComments.length - 1),
            },
          },
        },
      },
    ]);

    const utils = renderWithRedux(
      <ApolloProvider client={client}>
        <PostComments {...initialProps} {...props} />
      </ApolloProvider>,
    );

    utils.store.dispatch(
      setUser({
        id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
        username: 'dummy',
        profile: {
          display_name: 'dummy',
          thumbnail: null,
        },
      }),
    );

    return {
      ...utils,
    };
  };

  it('renders properly', () => {
    setup();
  });

  it('simulates remove process', async () => {
    const { getAllByText, getByText, queryByText } = setup();
    const removeButtons = getAllByText('삭제');
    fireEvent.click(removeButtons[0]);
    getByText('댓글을 정말로 삭제하시겠습니까?');
    const confirm = getByText('확인');
    fireEvent.click(confirm);
    await waitForElementToBeRemoved(() => queryByText('확인'));
  });
});

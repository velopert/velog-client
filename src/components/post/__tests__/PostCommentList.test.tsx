import * as React from 'react';
import { render } from 'react-testing-library';
import PostCommentsList, { PostCommentsListProps } from '../PostCommentsList';

describe('PostCommentsList', () => {
  const sampleComments = [
    {
      id: 'a38d0552-d2a4-4079-96ca-09aef72f00e1',
      user: {
        id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
        username: 'blablabla',
        profile: {
          thumbnail: null,
        },
      },
      text: 'Comment #1',
      replies_count: 0,
      created_at: '2019-06-15T14:22:28.198Z',
      deleted: false,
    },
    {
      id: '069f8843-44bb-483b-94f7-fca4cf9fcf4a',
      user: {
        id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
        username: 'blablabla',
        profile: {
          thumbnail: null,
        },
      },
      text: 'Comment #2',
      replies_count: 0,
      created_at: '2019-06-17T14:19:03.263Z',
      deleted: false,
    },
    {
      id: 'd93d1975-f99e-415f-9d41-594a7ff6921a',
      user: {
        id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
        username: 'blablabla',
        profile: {
          thumbnail: null,
        },
      },
      text: 'Comment #3',
      replies_count: 0,
      created_at: '2019-06-17T14:24:14.457Z',
      deleted: false,
    },
  ];
  const setup = (props: Partial<PostCommentsListProps> = {}) => {
    const initialProps: PostCommentsListProps = {
      comments: sampleComments,
      currentUserId: null,
    };
    const utils = render(<PostCommentsList {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders comment list', () => {
    const { getByText } = setup();
    getByText('Comment #1');
    getByText('Comment #2');
    getByText('Comment #3');
  });
});

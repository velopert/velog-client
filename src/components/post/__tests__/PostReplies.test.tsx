import * as React from 'react';
import { render } from 'react-testing-library';
import PostReplies, { PostRepliesProps } from '../PostReplies';

const sampleComments = [
  {
    id: '67139c27-cf3c-4da6-a25c-4b0ec54be379',
    user: {
      id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
      username: 'blablabla',
      profile: {
        thumbnail: null,
      },
    },
    text: 'ㅋㅋㅋ',
    replies_count: 2,
    created_at: '2019-06-19T14:56:26.022Z',
  },
  {
    id: '2f86fc23-2128-4e7c-99f5-f0fc4553afc8',
    user: {
      id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
      username: 'blablabla',
      profile: {
        thumbnail: null,
      },
    },
    text: 'sed',
    replies_count: 0,
    created_at: '2019-06-19T15:08:08.085Z',
  },
];
describe('PostReplies', () => {
  const setup = (props: Partial<PostRepliesProps> = {}) => {
    const initialProps: PostRepliesProps = {
      comments: sampleComments,
    };
    const utils = render(<PostReplies {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
});

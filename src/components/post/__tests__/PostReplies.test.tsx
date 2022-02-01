import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PostReplies, { PostRepliesProps } from '../PostReplies';
import renderWithRedux from '../../../lib/renderWithRedux';
import { Comment } from '../../../lib/graphql/post';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const sampleComments: Comment[] = [
  {
    id: '67139c27-cf3c-4da6-a25c-4b0ec54be379',
    user: {
      id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
      username: 'blablabla',
      profile: {
        id: '67139c27-cf3c-4da6-a25c-4b0ec54be379',
        thumbnail: null,
      },
    },
    text: '첫번째 댓글',
    replies_count: 2,
    created_at: '2019-06-19T14:56:26.022Z',
    deleted: false,
    level: 0,
    replies: undefined,
  },
  {
    id: '2f86fc23-2128-4e7c-99f5-f0fc4553afc8',
    user: {
      id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
      username: 'blablabla',
      profile: {
        id: '67139c27-cf3c-4da6-a25c-4b0ec54be379',
        thumbnail: null,
      },
    },
    text: '두번째 댓글',
    replies_count: 0,
    created_at: '2019-06-19T15:08:08.085Z',
    deleted: false,
    level: 0,
    replies: undefined,
  },
];
describe('PostReplies', () => {
  const setup = (props: Partial<PostRepliesProps> = {}) => {
    const initialProps: PostRepliesProps = {
      comments: sampleComments,
      onReply: () => {},
      onHide: () => {},
      onRemove: () => {},
    };
    const utils = renderWithRedux(
      <HelmetProvider>
        <MemoryRouter>
          <PostReplies {...initialProps} {...props} />
        </MemoryRouter>
      </HelmetProvider>w,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText } = setup();
    getByText('첫번째 댓글');
    getByText('두번째 댓글');
    getByText('답글 작성하기');
  });
  it('shows PostCommentsWrite when StartWritingButton is clicked', () => {
    const { getByText, getByPlaceholderText } = setup();
    const button = getByText('답글 작성하기');
    fireEvent.click(button);
    getByPlaceholderText('댓글을 작성하세요');
  });
  it('shows PostCommentsWrite when comments array is empty', () => {
    const { getByPlaceholderText } = setup({ comments: [] });
    getByPlaceholderText('댓글을 작성하세요');
  });
  it('calls onHide when comments array is empty and cancel button is clicked', () => {
    const onHide = jest.fn();
    const { getByText } = setup({ comments: [], onHide });
    const cancelButton = getByText('취소');
    fireEvent.click(cancelButton);
    expect(onHide).toBeCalled();
  });
  it('changes textarea', () => {
    const { getByPlaceholderText } = setup({ comments: [] });
    const textarea = getByPlaceholderText(
      '댓글을 작성하세요',
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, {
      target: {
        value: '안녕하세요',
      },
    });
    expect(textarea).toHaveProperty('value', '안녕하세요');
  });
  it('calls onReply when submit button is clicked', () => {
    const onReply = jest.fn();
    const { getByPlaceholderText, getByText } = setup({ onReply });

    const button = getByText('답글 작성하기');
    fireEvent.click(button);

    const textarea = getByPlaceholderText(
      '댓글을 작성하세요',
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, {
      target: {
        value: '안녕하세요',
      },
    });

    const submitButton = getByText('댓글 작성');
    fireEvent.click(submitButton);

    expect(onReply).toBeCalledWith('안녕하세요');

    getByText('답글 작성하기');
  });
});

import * as React from 'react';
import { render } from 'react-testing-library';
import PostCommentItem, { PostCommentItemProps } from '../PostCommentItem';
import { Comment } from '../../../lib/graphql/post';
import { formatDate } from '../../../lib/utils';

describe('PostCommentItem', () => {
  const sampleComment: Comment = {
    id: '70d24d3b-a6ce-46a3-86c5-1cba95843841',
    user: {
      id: '0bcdf3e5-a228-42c3-8b52-3f0dc118dfd8',
      username: 'blablabla',
      profile: {
        thumbnail: 'https://velog.io/sample.png',
      },
    },
    text: 'Hey there',
    replies_count: 0,
    created_at: '2019-06-14T14:53:11.979Z',
  };

  const setup = (props: Partial<PostCommentItemProps> = {}) => {
    const initialProps: PostCommentItemProps = {
      comment: sampleComment,
      onLoadReplies: () => Promise.resolve(),
      onReply: () => {},
    };
    const utils = render(<PostCommentItem {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText, getByAltText } = setup();
    getByText(sampleComment.user.username);
    getByText(formatDate(sampleComment.created_at));
    expect(getByAltText('comment-user-thumbnail')).toHaveAttribute(
      'src',
      sampleComment.user.profile.thumbnail!,
    );
    getByText(sampleComment.text);
  });
});

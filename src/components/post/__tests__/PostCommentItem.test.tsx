import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
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
    deleted: false,
  };
  const deletedComment: Comment = {
    id: '70d24d3b-a6ce-46a3-86c5-1cba95843841',
    user: null,
    text: null,
    replies_count: 0,
    created_at: '2019-06-14T14:53:11.979Z',
    deleted: true,
  };

  const setup = (props: Partial<PostCommentItemProps> = {}) => {
    const initialProps: PostCommentItemProps = {
      comment: sampleComment,
      ownComment: false,
      onRemove: () => {},
    };
    const utils = render(<PostCommentItem {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText, getByAltText, queryByText } = setup();
    getByText(sampleComment.user!.username);
    getByText(formatDate(sampleComment.created_at));
    expect(getByAltText('comment-user-thumbnail')).toHaveAttribute(
      'src',
      sampleComment.user!.profile.thumbnail!,
    );
    getByText(sampleComment.text!);
    const edit = queryByText('수정');
    const remove = queryByText('삭제');
    expect(edit).toBeFalsy();
    expect(remove).toBeFalsy();
  });
  it('render action buttons when ownComment is true', () => {
    const { getByText } = setup({
      ownComment: true,
    });
    getByText('수정');
    getByText('삭제');
  });
  it('renders deleted comment', () => {
    const { getByText } = setup({
      comment: deletedComment,
    });
    getByText('삭제된 댓글입니다.');
  });
  it('calls onRemove with id when remove is clicked', () => {
    const onRemove = jest.fn();
    const { getByText } = setup({
      ownComment: true,
      onRemove,
    });
    const remove = getByText('삭제');
    fireEvent.click(remove);
    expect(onRemove).toBeCalledWith(sampleComment.id);
  });
});

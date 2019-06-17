import * as React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import Typography from '../common/Typography';
import { PlusBoxIcon } from '../../static/svg';
import { userThumbnail } from '../../static/images';

const PostCommentItemBlock = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  & + & {
    border-top: 1px solid ${palette.gray2};
  }
`;
const CommentHead = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  .profile {
    display: flex;
    align-items: center;
    img {
      width: 3.375rem;
      height: 3.375rem;
      display: block;
      border-radius: 50%;
    }
    .comment-info {
      margin-left: 1rem;
      line-height: 1;
      .username {
        font-size: 1rem;
        font-weight: bold;
        color: ${palette.gray8};
      }
      .date {
        margin-top: 0.5rem;
        color: ${palette.gray6};
        font-size: 0.875rem;
      }
    }
  }
  .actions {
    font-size: 0.875rem;
    color: ${palette.gray6};
    span {
      cursor: pointer;
      &:hover {
        color: ${palette.gray5};
        text-decoration: underline;
      }
    }
    span + span {
      margin-left: 0.5rem;
    }
  }
`;

const CommentText = styled.p``;
const CommentFoot = styled.div`
  margin-top: 2rem;
  .toggler {
    display: flex;
    align-items: center;
    color: ${palette.teal6};
    font-weight: bold;
    svg {
      margin-right: 0.5rem;
    }
  }
`;

export interface PostCommentItemProps {
  comment: Comment;
}

const PostCommentItem: React.FC<PostCommentItemProps> = ({ comment }) => {
  const { user, created_at, text } = comment;
  return (
    <PostCommentItemBlock>
      <CommentHead>
        <div className="profile">
          <img
            src={user.profile.thumbnail || userThumbnail}
            alt="comment-user-thumbnail"
          />
          <div className="comment-info">
            <div className="username">{user.username}</div>
            <div className="date">{formatDate(created_at)}</div>
          </div>
        </div>
        <div className="actions">
          <span>수정</span>
          <span>삭제</span>
        </div>
      </CommentHead>
      <Typography>
        <CommentText>{text}</CommentText>
      </Typography>
      <CommentFoot>
        <div className="toggler">
          <PlusBoxIcon />
          <span>답글 달기</span>
        </div>
      </CommentFoot>
    </PostCommentItemBlock>
  );
};

export default PostCommentItem;

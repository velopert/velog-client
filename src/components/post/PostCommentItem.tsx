import React from 'react';
import styled, { css } from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import Typography from '../common/Typography';
import { PlusBoxIcon, MinusBoxIcon } from '../../static/svg';
import { userThumbnail } from '../../static/images';
import useBoolean from '../../lib/hooks/useBoolean';
import PostRepliesContainer from '../../containers/post/PostRepliesContainer';
import PostEditComment from '../../containers/post/PostEditComment';
import media from '../../lib/styles/media';
import { Link } from 'react-router-dom';
import MarkdownRender from '../common/MarkdownRender';
import optimizeImage from '../../lib/optimizeImage';

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
  align-items: center;
  .profile {
    display: flex;
    align-items: center;
    img {
      width: 3.375rem;
      height: 3.375rem;
      display: block;
      border-radius: 50%;
      object-fit: cover;
      ${media.small} {
        width: 2.5rem;
        height: 2.5rem;
      }
    }
    .comment-info {
      margin-left: 1rem;
      ${media.small} {
        margin-left: 0.5rem;
      }
      line-height: 1;
      .username {
        font-size: 1rem;
        font-weight: bold;
        color: ${themedPalette.text1};
        ${media.small} {
          font-size: 0.875rem;
        }
        a {
          color: inherit;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
            color: ${themedPalette.text2};
          }
        }
      }
      .date {
        margin-top: 0.5rem;
        color: ${themedPalette.text3};
        font-size: 0.875rem;
        ${media.small} {
          font-size: 0.75rem;
        }
      }
    }
  }
  .actions {
    font-size: 0.875rem;
    ${media.small} {
      font-size: 0.75rem;
    }

    color: ${themedPalette.text3};
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

const CommentText = styled.div<{ deleted: boolean }>`
  h1,
  h2 {
    font-size: 1.75rem;
    ${media.small} {
      font-size: 1.5rem;
    }
  }

  ${(props) =>
    props.deleted &&
    css`
      color: ${themedPalette.text3};
      font-style: italic;
    `}
`;
const CommentFoot = styled.div`
  margin-top: 2rem;
`;
const TogglerBlock = styled.div`
  display: inline-flex;
  align-items: center;
  color: ${palette.teal6};
  font-weight: bold;
  svg {
    margin-right: 0.5rem;
  }
  cursor: pointer;
  &:hover {
    color: ${palette.teal5};
  }
`;

export interface PostCommentItemProps {
  comment: Comment;
  ownComment: boolean;
  onRemove: (id: string) => any;
}

interface TogglerProps {
  open: boolean;
  count: number;
  onToggle: () => any;
}

const Toggler: React.FC<TogglerProps> = ({ open, onToggle, count }) => {
  const openText = count ? `${count}개의 답글` : `답글 달기`;

  return (
    <TogglerBlock onClick={onToggle}>
      {open ? <MinusBoxIcon /> : <PlusBoxIcon />}
      <span>{open ? '숨기기' : openText}</span>
    </TogglerBlock>
  );
};

const PostCommentItem: React.FC<PostCommentItemProps> = ({
  comment,
  ownComment,
  onRemove,
}) => {
  const { id, user, created_at, text, replies_count, deleted, level } = comment;
  const [open, onToggleOpen] = useBoolean(false);
  const [editing, onToggleEditing] = useBoolean(false);

  // hides comment where it is deleted and its every reply is also deleted
  if (deleted && replies_count === 0) return null;

  const velogLink = `/@${user && user.username}`;

  return (
    <PostCommentItemBlock className="comment">
      <CommentHead>
        <div className="profile">
          <Link to={velogLink}>
            <img
              src={optimizeImage(
                (user && user.profile.thumbnail) || userThumbnail,
                120,
              )}
              alt="comment-user-thumbnail"
            />
          </Link>
          <div className="comment-info">
            <div className="username">
              {user ? (
                <Link to={velogLink}>{user.username}</Link>
              ) : (
                '알 수 없음'
              )}
            </div>
            <div className="date">{formatDate(created_at)}</div>
          </div>
        </div>
        {ownComment && !editing && (
          <div className="actions">
            <span onClick={onToggleEditing}>수정</span>
            <span onClick={() => onRemove(id)}>삭제</span>
          </div>
        )}
      </CommentHead>
      {editing ? (
        <PostEditComment
          id={comment.id}
          defaultText={comment.text || ''}
          onCancel={onToggleEditing}
        />
      ) : (
        <Typography>
          <CommentText deleted={deleted}>
            <MarkdownRender markdown={text ?? '삭제된 댓글입니다.'} />
          </CommentText>
        </Typography>
      )}
      <CommentFoot>
        {level < 2 && (
          <Toggler open={open} onToggle={onToggleOpen} count={replies_count} />
        )}
        {open && <PostRepliesContainer commentId={id} onHide={onToggleOpen} />}
      </CommentFoot>
    </PostCommentItemBlock>
  );
};

export default React.memo(PostCommentItem);

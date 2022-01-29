import React from 'react';
import { PartialPost } from '../../lib/graphql/post';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import { Link } from 'react-router-dom';

export interface SavedPostItemProps {
  post: PartialPost;
  onRemove: (id: string) => void;
}

const SavedItemBlock = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  line-height: 1.5;
  a {
    text-decoration: none;
    color: inherit;
  }
  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: ${palette.gray8};
  }
  p {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: ${palette.gray7};
  }
  section {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    .time {
      color: ${palette.gray6};
    }
    .remove {
      cursor: pointer;
      text-decoration: underline;
      color: ${palette.gray8};
      outline: none;
      border: none;
      background: none;
      font-size: inherit;
      padding: 0;
      &:hover {
        color: ${palette.red6};
      }
    }
  }
  & + & {
    border-top: 1px solid ${palette.gray3};
  }
`;
function SavedPostItem({ post, onRemove }: SavedPostItemProps) {
  const editUrl = `/write?id=${post.id}`;
  return (
    <SavedItemBlock>
      <h3>
        <Link to={editUrl}>{post.title}</Link>
      </h3>
      <p>
        <Link to={editUrl}>{post.short_description}</Link>
      </p>
      <section>
        <div className="time">{formatDate(post.updated_at)}</div>
        <button className="remove" onClick={() => onRemove(post.id)}>
          삭제
        </button>
      </section>
    </SavedItemBlock>
  );
}

export default SavedPostItem;

import React from 'react';
import useSavedPosts from './hooks/useSavedPosts';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import SavedPostItem from './SavedPostItem';
import PopupOKCancel from '../common/PopupOKCancel';

export interface SavedPostsProps {}

const SavedPostsBlock = styled.div``;
const Empty = styled.div`
  padding-top: 5rem;
  padding-bottom: 5rem;
  text-align: center;
  font-size: 1.5rem;
  color: ${themedPalette.text3};
`;

function SavedPosts(props: SavedPostsProps) {
  const { posts, askRemove, onAskRemove, onConfirmRemove, onCancelRemove } =
    useSavedPosts();

  if (!posts) return null;

  if (posts.length === 0) {
    return (
      <SavedPostsBlock>
        <Empty>임시 저장한 글이 없습니다.</Empty>
      </SavedPostsBlock>
    );
  }

  return (
    <>
      <SavedPostsBlock>
        {posts.map((post) => (
          <SavedPostItem post={post} key={post.id} onRemove={onAskRemove} />
        ))}
      </SavedPostsBlock>
      <PopupOKCancel
        title="임시 글 삭제"
        visible={askRemove}
        onConfirm={onConfirmRemove}
        onCancel={onCancelRemove}
      >
        {`임시 저장한 글을 삭제하시겠습니까?
삭제한 글은 복구할 수 없습니다.`}
      </PopupOKCancel>
    </>
  );
}

export default SavedPosts;

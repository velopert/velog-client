import React from 'react';
import useSavedPosts from './hooks/useSavedPosts';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import SavedPostItem from './SavedPostItem';

export interface SavedPostsProps {}

const SavedPostsBlock = styled.div``;
const Empty = styled.div`
  padding-top: 5rem;
  padding-bottom: 5rem;
  text-align: center;
  font-size: 1.5rem;
  color: ${palette.gray6};
`;

function SavedPosts(props: SavedPostsProps) {
  const { posts, loading } = useSavedPosts();

  if (!posts) return null;

  if (posts.length === 0) {
    return (
      <SavedPostsBlock>
        <Empty>임시 저장한 글이 없습니다.</Empty>
      </SavedPostsBlock>
    );
  }
  return (
    <SavedPostsBlock>
      {posts.map(post => (
        <SavedPostItem post={post} key={post.id} />
      ))}
    </SavedPostsBlock>
  );
}

export default SavedPosts;

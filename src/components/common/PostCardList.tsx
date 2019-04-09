import React, { FC } from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import { PartialPost } from '../../lib/graphql/post';

const PostCardListBlock = styled.div``;

interface PostCardListProps {
  posts: PartialPost[];
}

const PostCardList: FC<PostCardListProps> = ({ posts }) => {
  return (
    <PostCardListBlock>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </PostCardListBlock>
  );
};

export default PostCardList;

import React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import { Post, PartialPost } from '../../lib/graphql/post';

const PostCardListBlock = styled.div``;

interface PostCardListProps {
  posts: PartialPost[];
}

const PostCardList: React.SFC<PostCardListProps> = ({ posts }) => {
  return (
    <PostCardListBlock>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </PostCardListBlock>
  );
};

export default PostCardList;

import * as React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import { PartialPost } from '../../lib/graphql/post';

const PostCardListBlock = styled.div``;

interface PostCardListProps {
  posts: PartialPost[];
  hideUser?: boolean;
}

const PostCardList: React.SFC<PostCardListProps> = ({ posts, hideUser }) => {
  return (
    <PostCardListBlock>
      {posts.map(post => (
        <PostCard key={post.id} post={post} hideUser={hideUser} />
      ))}
    </PostCardListBlock>
  );
};

export default PostCardList;

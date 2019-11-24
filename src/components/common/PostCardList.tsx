import * as React from 'react';
import styled from 'styled-components';
import PostCard, { PostCardSkeleton } from './PostCard';
import { PartialPost } from '../../lib/graphql/post';

const PostCardListBlock = styled.div``;

interface PostCardListProps {
  posts: PartialPost[];
  hideUser?: boolean;
}

const PostCardList: React.FC<PostCardListProps> = ({ posts, hideUser }) => {
  return (
    <PostCardListBlock>
      {posts.map(post => (
        <PostCard key={post.id} post={post} hideUser={hideUser} />
      ))}
    </PostCardListBlock>
  );
};

export type PostCardListSkeletonProps = {
  hideUser?: boolean;
};

export function PostCardListSkeleton({ hideUser }: PostCardListSkeletonProps) {
  return (
    <PostCardListBlock>
      {Array.from({ length: 3 }).map((_, i) => (
        <PostCardSkeleton hideUser={hideUser} key={i} />
      ))}
    </PostCardListBlock>
  );
}

export default PostCardList;

import * as React from 'react';
import styled from 'styled-components';
import PostCard, { PostCardSkeleton } from './FlatPostCard';
import { PartialPost } from '../../lib/graphql/post';
import { themedPalette } from '../../lib/styles/themes';

const PostCardListBlock = styled.div``;

interface PostCardListProps {
  posts: PartialPost[];
  hideUser?: boolean;
}

const PostCardList: React.FC<PostCardListProps> = ({ posts, hideUser }) => {
  return (
    <PostCardListBlock>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} hideUser={hideUser} />
      ))}
    </PostCardListBlock>
  );
};

export type PostCardListSkeletonProps = {
  hideUser?: boolean;
  forLoading?: boolean;
};

export function PostCardListSkeleton({
  hideUser,
  forLoading,
}: PostCardListSkeletonProps) {
  return (
    <PostCardListBlock>
      {forLoading && <Separator />}
      {Array.from({ length: forLoading ? 1 : 3 }).map((_, i) => (
        <PostCardSkeleton hideUser={hideUser} key={i} />
      ))}
    </PostCardListBlock>
  );
}

const Separator = styled.div`
  border-top: 1px solid ${themedPalette.border4};
`;

export default PostCardList;

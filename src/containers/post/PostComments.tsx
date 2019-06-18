import * as React from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';
import { Comment, WRITE_COMMENT, RELOAD_REPLIES } from '../../lib/graphql/post';
import PostCommentsList from '../../components/post/PostCommentsList';
import { MutationResult, Mutation } from 'react-apollo';

export interface PostCommentsProps {
  comments: Comment[];
  postId: string;
}

const PostComments: React.FC<PostCommentsProps> = ({ comments, postId }) => {
  return (
    <PostCommentsTemplate count={comments.length}>
      <PostCommentsWriteContainer postId={postId} />
      <Mutation mutation={WRITE_COMMENT}>
        {(writeComment, { client }: MutationResult) => {
          type ReplyOptions = {
            commentId: string;
            text: string;
          };
          const onLoadReplies = (id: string) => {
            return client.query({
              query: RELOAD_REPLIES,
              variables: {
                id: id,
              },
              fetchPolicy: 'network-only',
            });
          };
          const onReply = async ({ commentId, text }: ReplyOptions) => {
            try {
              await writeComment({
                variables: {
                  post_id: postId,
                  comment_id: commentId,
                  text,
                },
              });
              await onLoadReplies(commentId);
            } catch (e) {
              console.log(e);
            }
          };
          return (
            <PostCommentsList
              comments={comments}
              onLoadReplies={onLoadReplies}
              onReply={onReply}
            />
          );
        }}
      </Mutation>
    </PostCommentsTemplate>
  );
};

export default PostComments;

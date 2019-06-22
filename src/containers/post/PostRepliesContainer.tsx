import React from 'react';
import { Query, QueryResult, Mutation } from 'react-apollo';
import {
  GET_REPLIES,
  CommentWithReplies,
  WRITE_COMMENT,
} from '../../lib/graphql/post';
import PostReplies from '../../components/post/PostReplies';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

export interface PostRepliesProps {
  commentId: string;
  onHide: () => void;
}

const PostRepliesContainer: React.FC<PostRepliesProps> = ({
  commentId,
  onHide,
}) => {
  const postId = useSelector((state: RootState) => state.post.id);
  return (
    <Query query={GET_REPLIES} variables={{ id: commentId }}>
      {({
        loading,
        error,
        data,
        refetch,
      }: QueryResult<{ comment: CommentWithReplies }>) => {
        if (loading || !data) return null;
        return (
          <Mutation mutation={WRITE_COMMENT}>
            {writeComment => {
              const onReply = async (text: string) => {
                try {
                  await writeComment({
                    variables: {
                      post_id: postId,
                      comment_id: commentId,
                      text,
                    },
                  });
                  refetch();
                } catch (e) {
                  console.log(e);
                }
              };
              return (
                <PostReplies
                  comments={data.comment.replies}
                  onReply={onReply}
                  onHide={onHide}
                />
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default PostRepliesContainer;

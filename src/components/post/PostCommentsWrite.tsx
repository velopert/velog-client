import * as React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '../common/Button';

const PostCommentsWriteBlock = styled.div`
  > .buttons-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;
const StyledTextarea = styled(TextareaAutosize)``;

export interface PostCommentsWriteProps {}

const PostCommentsWrite: React.FC<PostCommentsWriteProps> = props => {
  return (
    <PostCommentsWriteBlock>
      <StyledTextarea placeholder="댓글을 작성하세요" />
      <div className="buttons-wrapper">
        <Button>댓글 작성</Button>
      </div>
    </PostCommentsWriteBlock>
  );
};

export default PostCommentsWrite;

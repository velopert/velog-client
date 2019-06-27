import * as React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import { customFont } from '../../lib/styles/utils';

const PostCommentsWriteBlock = styled.div`
  > .buttons-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;
const StyledTextarea = styled(TextareaAutosize)`
  resize: none;
  padding: 1rem;
  outline: none;
  border: 1px solid ${palette.gray2};
  margin-bottom: 1.5rem;
  width: 100%;
  border-radius: 4px;
  min-height: 5.625rem;
  font-size: 1rem;
  ${customFont};
  color: ${palette.gray9};
  &::placeholder {
    color: ${palette.gray5};
  }
  line-height: 1.75;
`;

export interface PostCommentsWriteProps {
  comment: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onWrite: () => void;
  onCancel?: () => void;
}

const PostCommentsWrite: React.FC<PostCommentsWriteProps> = ({
  comment,
  onChange,
  onWrite,
  onCancel,
}) => {
  return (
    <PostCommentsWriteBlock>
      <StyledTextarea
        placeholder="댓글을 작성하세요"
        value={comment}
        onChange={onChange}
      />
      <div className="buttons-wrapper">
        {onCancel && (
          <Button onClick={onCancel} inline color="darkGray">
            취소
          </Button>
        )}
        <Button inline onClick={onWrite}>
          댓글 작성
        </Button>
      </div>
    </PostCommentsWriteBlock>
  );
};

export default PostCommentsWrite;

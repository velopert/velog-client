import * as React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '../common/Button';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { customFont } from '../../lib/styles/utils';
import media from '../../lib/styles/media';

const PostCommentsWriteBlock = styled.div`
  > .buttons-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;
const StyledTextarea = styled(TextareaAutosize)`
  resize: none;
  padding: 1rem;
  padding-bottom: 1.5rem;
  outline: none;
  border: 1px solid ${themedPalette.border4};
  margin-bottom: 1.5rem;
  width: 100%;
  border-radius: 4px;
  min-height: 6.125rem;
  font-size: 1rem;
  ${customFont};
  color: ${themedPalette.text1};
  &::placeholder {
    color: ${themedPalette.text3};
  }
  line-height: 1.75;
  ${media.small} {
    margin-bottom: 1rem;
  }
  background: ${themedPalette.bg_element1};
`;

export interface PostCommentsWriteProps {
  comment: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onWrite: () => void;
  onCancel?: () => void;
  edit?: boolean;
}

const PostCommentsWrite: React.FC<PostCommentsWriteProps> = ({
  comment,
  onChange,
  onWrite,
  onCancel,
  edit,
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
          <Button onClick={onCancel} inline color="transparent">
            취소
          </Button>
        )}
        <Button inline onClick={onWrite}>
          댓글 {edit ? '수정' : '작성'}
        </Button>
      </div>
    </PostCommentsWriteBlock>
  );
};

export default PostCommentsWrite;

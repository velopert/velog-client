import * as React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { MdArrowBack } from 'react-icons/md';
import media from '../../lib/styles/media';
import { themedPalette } from '../../lib/styles/themes';

const WriteFooterBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  width: 100%;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  background: ${themedPalette.bg_element9};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Group = styled.div`
  justify-content: flex-end;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 2.5rem;
  font-size: 1.125rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const BackButton = styled.button`
  height: 2.5rem;
  padding: 0.5rem 1rem;
  align-items: center;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  display: flex;
  outline: none;
  color: ${themedPalette.text1};
  &:hover,
  &:focus {
    background: ${themedPalette.slight_layer};
  }
  svg {
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }
  span {
    font-size: 1.125rem;
    ${media.xsmall} {
      display: none;
    }
  }
`;

export interface WriteFooterProps {
  onTempSave: (notify?: boolean) => void;
  onPublish: () => void;
  onGoBack: () => void;
  edit: boolean;
}

const WriteFooter: React.FC<WriteFooterProps> = ({
  onGoBack,
  onTempSave,
  onPublish,
  edit,
}) => {
  return (
    <WriteFooterBlock>
      <BackButton onClick={onGoBack}>
        <MdArrowBack />
        <span>나가기</span>
      </BackButton>
      <Group>
        <StyledButton
          inline
          color="transparent"
          onClick={() => onTempSave(true)}
        >
          임시저장
        </StyledButton>
        <StyledButton inline color="teal" onClick={onPublish}>
          {edit ? '수정하기' : '출간하기'}
        </StyledButton>
      </Group>
    </WriteFooterBlock>
  );
};

export default WriteFooter;

import React from 'react';
import styled from 'styled-components';
import EditRemoveGroup from '../common/EditRemoveGroup';
import Button from '../common/Button';

const SeriesActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 2rem;
  align-items: center;
`;

export interface SeriesActionButtonsProps {
  onEdit: () => void;
  onApply: () => void;
  editing: boolean;
  // onRemove: () => void;
}

const SeriesActionButtons = ({
  onEdit,
  onApply,
  editing,
}: SeriesActionButtonsProps) => {
  return (
    <SeriesActionButtonsBlock>
      {editing ? (
        <Button onClick={onApply}>적용</Button>
      ) : (
        <EditRemoveGroup>
          <button onClick={onEdit}>수정</button>
          <button>삭제</button>
        </EditRemoveGroup>
      )}
    </SeriesActionButtonsBlock>
  );
};

export default SeriesActionButtons;

import * as React from 'react';
import styled from 'styled-components';
import PopupBase from './PopupBase';
import Button from './Button';
import palette from '../../lib/styles/palette';

const PopupOKCancelBlock = styled.div`
  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: ${palette.gray8};
    line-height: 1.5;
    font-weight: bold;
  }
  p {
    line-height: 1.5;
    font-size: 1.125rem;
    color: ${palette.gray7};
  }
  .button-area {
    display: flex;
    justify-content: flex-end;
    button + button {
      margin-left: 0.75rem;
    }
  }
`;

export interface PopupOKCancelProps {
  visible: boolean;
  title?: string;
  onConfirm?: () => any;
  onCancel?: () => any;
  children: React.ReactNode;
}

const PopupOKCancel: React.FC<PopupOKCancelProps> = ({
  visible,
  title,
  children,
  onConfirm,
  onCancel,
}) => {
  return (
    <PopupBase visible={visible}>
      <PopupOKCancelBlock>
        {title && <h3>{title}</h3>}
        <p>{children}</p>
        <div className="button-area">
          <Button color="gray" onClick={onCancel}>
            취소
          </Button>
          <Button onClick={onConfirm}>확인</Button>
        </div>
      </PopupOKCancelBlock>
    </PopupBase>
  );
};

export default PopupOKCancel;

import * as React from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import useInput from '../../lib/hooks/useInput';
import palette from '../../lib/styles/palette';
import RoundButton from '../common/RoundButton';
import { MdDelete } from 'react-icons/md';

const AddLinkBlock = styled.div`
  z-index: 5;
  position: absolute;
  margin-bottom: 1rem;
  & > .wrapper {
    margin-top: 1rem;
    width: 20rem;
    background: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    .top-wrapper {
      margin-bottom: 1rem;
      .title {
        font-weight: bold;
        color: ${palette.gray8};
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      svg {
        font-size: 1.5rem;
        color: ${palette.gray5};
        cursor: pointer;
        &:hover {
          color: ${palette.gray9};
        }
      }
    }
    form {
      width: 100%;
      display: flex;
      align-items: center;
      input {
        flex: 1;
        border: none;
        outline: none;
        border-bottom: 1px inset ${palette.gray5};
        font-size: 1rem;
        margin-right: 0.5rem;
        line-height: 1.5;
        padding: 0;
      }
    }
    padding: 1.5rem 1rem;
  }
`;

interface AddLinkProps {
  left: number;
  top: number | null;
  bottom: number | null;
  stickToRight?: boolean;
  onConfirm: (link: string) => void;
  onClose: () => void;
  onDelete?: () => void;
  defaultValue: string;
}

const { useCallback, useRef, useEffect } = React;

const AddLink: React.FC<AddLinkProps> = ({
  left,
  top,
  bottom,
  stickToRight,
  onConfirm,
  onClose,
  onDelete,
  defaultValue,
}) => {
  const [value, onChange] = useInput(defaultValue);
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onConfirm(value);
    },
    [onConfirm, value],
  );
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!input.current) return;
    input.current.focus();
  }, []);
  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <AddLinkBlock
        style={{
          left: stickToRight ? 'initial' : left,
          top: top || 'initial',
          bottom: bottom || 'initial',
          right: stickToRight ? '3rem' : 'initial',
        }}
      >
        <div className="wrapper">
          <div className="top-wrapper">
            <div className="title">
              {defaultValue ? '링크 수정' : '링크 등록'}
            </div>
            {defaultValue && <MdDelete onClick={onDelete} />}
          </div>
          <form onSubmit={onSubmit}>
            <input
              value={value}
              onChange={onChange}
              placeholder="URL 을 입력하세요"
              ref={input}
            />
            <RoundButton color="darkGray" size="SMALL">
              확인
            </RoundButton>
          </form>
        </div>
      </AddLinkBlock>
    </OutsideClickHandler>
  );
};

export default AddLink;

import * as React from 'react';
import styled from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';
import useInput from '../../lib/hooks/useInput';
import palette from '../../lib/styles/palette';
import RoundButton from '../common/RoundButton';

const AddLinkBlock = styled.div`
  position: absolute;
  & > .wrapper {
    margin-top: 1rem;
    width: 20rem;
    background: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    .title {
      font-weight: bold;
      margin-bottom: 1rem;
      color: ${palette.gray8};
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
    padding: 1.25rem 1rem;
  }
`;

interface AddLinkProps {
  left: number;
  top: number;
  onConfirm: (link: string) => void;
  onClose: () => void;
}

const { useCallback } = React;

const AddLink: React.SFC<AddLinkProps> = ({
  left,
  top,
  onConfirm,
  onClose,
}) => {
  const [value, onChange] = useInput('');
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onConfirm(value);
    },
    [value],
  );
  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <AddLinkBlock
        style={{
          left,
          top,
        }}
      >
        <div className="wrapper">
          <div className="title">링크 등록</div>
          <form onSubmit={onSubmit}>
            <input
              value={value}
              onChange={onChange}
              placeholder="URL 을 입력하세요"
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

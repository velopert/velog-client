import React, { FC, ChangeEvent } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const AuthEmailFormBlock = styled.form`
  width: 100%;
  display: flex;
  height: 3rem;
  input {
    flex: 1;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid ${palette.gray3};
    border-right: none;
    &::placeholder {
      color: ${palette.gray6};
    }
    &:disabled {
      background: ${palette.gray1};
    }
  }
  button {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    background: ${palette.teal6};
    color: white;
    font-size: 1rem;
    font-weight: bold;
    outline: none;
    border: none;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    width: 5rem;
    cursor: pointer;
    &:hover,
    &:focus {
      background: ${palette.teal5};
    }
    &:disabled {
      background: ${palette.gray5};
      color: ${palette.gray3};
      cursor: default;
    }
  }
`;

interface AuthEmailFormProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onSubmit: (value: string) => void;
  mode: 'REGISTER' | 'LOGIN';
  disabled: boolean;
}

const AuthEmailForm: FC<AuthEmailFormProps> = ({
  onChange,
  value,
  onSubmit,
  mode,
  disabled,
}) => {
  return (
    <AuthEmailFormBlock
      onSubmit={e => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <input
        onChange={onChange}
        value={value}
        tabIndex={2}
        placeholder="이메일을 입력하세요."
        disabled={disabled}
      />
      <button tabIndex={3} disabled={disabled}>
        {mode === 'REGISTER' ? '회원가입' : '로그인'}
      </button>
    </AuthEmailFormBlock>
  );
};

export default AuthEmailForm;

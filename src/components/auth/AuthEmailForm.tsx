import * as React from 'react';
import styled from 'styled-components';

const AuthEmailFormBlock = styled.form``;

interface AuthEmailFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onSubmit: (value: string) => void;
  mode: 'REGISTER' | 'LOGIN';
}

const AuthEmailForm: React.SFC<AuthEmailFormProps> = ({
  onChange,
  value,
  onSubmit,
  mode,
}) => {
  return (
    <AuthEmailFormBlock
      onSubmit={e => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <input onChange={onChange} value={value} />
      <button>{mode === 'REGISTER' ? '회원가입' : '로그인'}</button>
    </AuthEmailFormBlock>
  );
};

export default AuthEmailForm;

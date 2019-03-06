import * as React from 'react';
import styled from 'styled-components';
import useInput from '../../lib/hooks/useInput';
import AuthEmailForm from './AuthEmailForm';
import { AuthMode } from '../../modules/core';

const AuthFormBlock = styled.div``;

interface AuthFormProps {
  mode: AuthMode;
}

const AuthForm: React.SFC<AuthFormProps> = ({ mode }) => {
  const [email, onChangeEmail] = useInput('');
  const onSubmit = (email: string) => {
    console.log(email);
  };

  const modeText = mode === 'REGISTER' ? '회원가입' : '로그인';

  return (
    <AuthFormBlock>
      <h2>{modeText}</h2>
      <AuthEmailForm
        value={email}
        onChange={onChangeEmail}
        onSubmit={onSubmit}
        mode={mode}
      />
    </AuthFormBlock>
  );
};

export default AuthForm;

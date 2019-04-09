import React, { FC } from 'react';
import styled from 'styled-components';
import useInput from '../../lib/hooks/useInput';
import AuthEmailForm from './AuthEmailForm';
import { AuthMode } from '../../modules/core';
import palette from '../../lib/styles/palette';
import AuthSocialButtonGroup from './AuthSocialButtonGroup';
import AuthEmailSuccess from './AuthEmailSuccess';

const AuthFormBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  line-height: 1.5;
  h2,
  h4 {
    margin: 0;
  }
  h2 {
    font-size: 1.3125rem;
    color: ${palette.gray8};
  }
  h4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: ${palette.gray6};
  }
  section + section {
    margin-top: 2.5rem;
  }
  .foot {
    text-align: right;
    span {
      margin-right: 0.25rem;
    }
    a {
      font-weight: bold;
      color: ${palette.teal6};
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export interface AuthFormProps {
  mode: AuthMode;
  loading: boolean;
  onToggleMode: () => void;
  onSendAuthEmail: (email: string) => void;
  registered: boolean | null;
}

const AuthForm: FC<AuthFormProps> = ({
  mode,
  onToggleMode,
  onSendAuthEmail,
  loading,
  registered,
}) => {
  const [email, onChangeEmail] = useInput('');
  const onSubmit = (email: string) => {
    onSendAuthEmail(email);
  };

  const modeText = mode === 'REGISTER' ? '회원가입' : '로그인';

  return (
    <AuthFormBlock>
      <div>
        <h2 data-testid="title">{modeText}</h2>
        <section>
          <h4>이메일로 {modeText}</h4>
          {registered !== null ? (
            <AuthEmailSuccess registered={registered} />
          ) : (
            <AuthEmailForm
              value={email}
              onChange={onChangeEmail}
              onSubmit={onSubmit}
              mode={mode}
              disabled={loading}
            />
          )}
        </section>
        <section>
          <h4>소셜 계정으로 {modeText}</h4>
          <AuthSocialButtonGroup />
        </section>
      </div>
      <div className="foot">
        <span>
          {mode === 'LOGIN'
            ? '아직 회원이 아니신가요?'
            : '계정이 이미 있으신가요?'}
        </span>
        <a tabIndex={7} onClick={onToggleMode} data-testid="switchmode">
          {mode === 'LOGIN' ? '회원가입' : '로그인'}
        </a>
      </div>
    </AuthFormBlock>
  );
};

export default AuthForm;

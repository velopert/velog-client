import * as React from 'react';
import styled from 'styled-components';
import useInput from '../../lib/hooks/useInput';
import AuthEmailForm from './AuthEmailForm';
import { AuthMode } from '../../modules/core';
import { themedPalette } from '../../lib/styles/themes';
import AuthSocialButtonGroup from './AuthSocialButtonGroup';
import AuthEmailSuccess from './AuthEmailSuccess';
import media from '../../lib/styles/media';

const AuthFormBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  line-height: 1.5;
  .upper-wrapper {
    ${media.small} {
      margin-top: 2rem;
    }
  }
  h2,
  h4 {
    margin: 0;
  }
  h2 {
    font-size: 1.3125rem;
    color: ${themedPalette.text1};
  }
  h4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: ${themedPalette.text3};
  }
  section + section {
    margin-top: 2.5rem;
  }
  .foot {
    ${media.small} {
      margin-top: 2rem;
    }

    text-align: right;
    span {
      margin-right: 0.25rem;
    }
    .link {
      display: inline-block;
      font-weight: bold;
      color: ${themedPalette.primary1};
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Warning = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: ${themedPalette.text3};
`;

export interface AuthFormProps {
  mode: AuthMode;
  loading: boolean;
  onToggleMode: () => void;
  onSendAuthEmail: (email: string) => void;
  registered: boolean | null;
  currentPath: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onToggleMode,
  onSendAuthEmail,
  loading,
  registered,
  currentPath,
}) => {
  const [email, onChangeEmail] = useInput('');
  const onSubmit = (email: string) => {
    onSendAuthEmail(email);
  };

  const modeText = mode === 'REGISTER' ? '회원가입' : '로그인';

  return (
    <AuthFormBlock>
      <div className="upper-wrapper">
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
          <AuthSocialButtonGroup currentPath={currentPath} />
        </section>
      </div>
      <div className="foot">
        <span>
          {mode === 'LOGIN'
            ? '아직 회원이 아니신가요?'
            : '계정이 이미 있으신가요?'}
        </span>
        <div
          className="link"
          tabIndex={7}
          onClick={onToggleMode}
          data-testid="switchmode"
        >
          {mode === 'LOGIN' ? '회원가입' : '로그인'}
        </div>
      </div>
    </AuthFormBlock>
  );
};

export default AuthForm;

import * as React from 'react';
import styled, { css } from 'styled-components';
import { MdCheck } from 'react-icons/md';
import palette from '../../lib/styles/palette';

const AuthEmailSuccessBlock = styled.div<{ isIntegrate?: boolean }>`
  display: flex;
  align-items: center;
  background: ${palette.teal1};
  border: 1px solid ${palette.teal2};
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  height: 3rem;
  color: ${palette.teal9};
  white-space: pre;
  .icon {
    font-size: 1.5rem;
  }
  .description {
    font-size: 0.875rem;
    flex: 1;
    text-align: center;
  }

  ${(props) =>
    props.isIntegrate &&
    css`
      height: 4rem;
    `}
`;

const FakeLink = styled.button`
  display: inline;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;
  background: none;
  padding: 0;
  border: none;
  outline: none;
  color: ${palette.teal9};
  &:hover {
    color: ${palette.teal7};
  }
`;

export interface AuthEmailSuccessProps {
  registered: boolean;
  isIntegrate?: boolean;
}

const AuthEmailSuccess: React.FC<AuthEmailSuccessProps> = ({
  registered,
  isIntegrate,
}) => {
  const text = registered ? '로그인' : '회원가입';
  return (
    <AuthEmailSuccessBlock isIntegrate={isIntegrate}>
      <MdCheck className="icon" />
      <div className="description">
        {text} 링크가 이메일로 전송되었습니다.
        {isIntegrate ? (
          <>
            {'\n'}로그인 후 이 창에서{' '}
            <FakeLink
              onClick={() => {
                window.location.reload();
              }}
            >
              새로고침
            </FakeLink>
            을 해주세요.
          </>
        ) : null}
      </div>
    </AuthEmailSuccessBlock>
  );
};

export default AuthEmailSuccess;

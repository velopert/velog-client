import * as React from 'react';
import styled from 'styled-components';
import { MdCheck } from 'react-icons/md';
import palette from '../../lib/styles/palette';

const AuthEmailSuccessBlock = styled.div`
  display: flex;
  align-items: center;
  background: ${palette.teal1};
  border: 1px solid ${palette.teal2};
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  height: 3rem;
  color: ${palette.teal7};
  .icon {
    font-size: 1.5rem;
  }
  .description {
    font-size: 0.875rem;
    flex: 1;
    text-align: center;
  }
`;

export interface AuthEmailSuccessProps {
  registered: boolean;
}

const AuthEmailSuccess: React.FC<AuthEmailSuccessProps> = ({ registered }) => {
  const text = registered ? '로그인' : '회원가입';
  return (
    <AuthEmailSuccessBlock>
      <MdCheck className="icon" />
      <div className="description">{text} 링크가 이메일로 전송되었습니다.</div>
    </AuthEmailSuccessBlock>
  );
};

export default AuthEmailSuccess;

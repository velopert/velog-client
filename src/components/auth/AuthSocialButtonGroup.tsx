import React, { FC } from 'react';
import styled from 'styled-components';
import AuthSocialButton from './AuthSocialButton';

const AuthSocialButtonGroupBlock = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`;

interface AuthSocialButtonGroupProps {}

const AuthSocialButtonGroup: FC<AuthSocialButtonGroupProps> = props => {
  return (
    <AuthSocialButtonGroupBlock>
      <AuthSocialButton provider="github" tabIndex={4} />
      <AuthSocialButton provider="google" tabIndex={5} />
      <AuthSocialButton provider="facebook" tabIndex={6} />
    </AuthSocialButtonGroupBlock>
  );
};

export default AuthSocialButtonGroup;

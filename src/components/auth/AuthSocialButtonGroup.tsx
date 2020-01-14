import * as React from 'react';
import styled from 'styled-components';
import AuthSocialButton from './AuthSocialButton';

const AuthSocialButtonGroupBlock = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`;

const AuthSocialButtonGroup = ({ currentPath }: { currentPath: string }) => {
  return (
    <AuthSocialButtonGroupBlock>
      <AuthSocialButton
        provider="github"
        tabIndex={4}
        currentPath={currentPath}
      />
      <AuthSocialButton
        provider="google"
        tabIndex={5}
        currentPath={currentPath}
      />
      <AuthSocialButton
        provider="facebook"
        tabIndex={6}
        currentPath={currentPath}
      />
    </AuthSocialButtonGroupBlock>
  );
};

export default AuthSocialButtonGroup;

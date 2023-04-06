import * as React from 'react';
import styled from 'styled-components';
import AuthSocialButton from './AuthSocialButton';

const AuthSocialButtonGroupBlock = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`;

const AuthSocialButtonGroup = ({
  currentPath,
  isIntegrate,
  integrateState,
}: {
  currentPath: string;
  isIntegrate?: boolean;
  integrateState?: string;
}) => {
  return (
    <AuthSocialButtonGroupBlock>
      <AuthSocialButton
        provider="github"
        tabIndex={4}
        currentPath={currentPath}
        isIntegrate={isIntegrate}
        integrateState={integrateState}
      />
      <AuthSocialButton
        provider="google"
        tabIndex={5}
        currentPath={currentPath}
        isIntegrate={isIntegrate}
        integrateState={integrateState}
      />
      <AuthSocialButton
        provider="facebook"
        tabIndex={6}
        currentPath={currentPath}
        isIntegrate={isIntegrate}
        integrateState={integrateState}
      />
    </AuthSocialButtonGroupBlock>
  );
};

export default AuthSocialButtonGroup;

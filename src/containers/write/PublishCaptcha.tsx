import React from 'react';
import styled from 'styled-components';
import Spinner from '../../components/common/SpinnerBlock';
import useTurnstile from '../../lib/hooks/useTurnstile';

const PublishCapchaBlock = styled.section`
  margin-top: 1.5rem;

  & > #cf-turnstile {
    iframe {
      width: 100% !important;
    }
  }
`;

const SpinnerBlock = styled(PublishCapchaBlock)`
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 50px;
    height: 50px;
  }
`;

interface PublishCaptchaProps {}

const PublishCaptcha: React.FC<PublishCaptchaProps> = () => {
  const { isReady } = useTurnstile();

  if (!isReady) {
    return (
      <SpinnerBlock>
        <Spinner />
      </SpinnerBlock>
    );
  }

  return (
    <PublishCapchaBlock>
      <div id="cf-turnstile"></div>
    </PublishCapchaBlock>
  );
};

export default PublishCaptcha;

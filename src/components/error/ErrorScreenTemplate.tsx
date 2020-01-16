import React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

export type ErrorScreenTemplateProps = {
  image: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

function ErrorScreenTemplate({
  image,
  message,
  buttonText,
  onButtonClick,
}: ErrorScreenTemplateProps) {
  return (
    <Screen>
      <img src={image} alt="error-image" />
      <div className="message">{message}</div>
      {buttonText && (
        <div className="button-wrapper">
          <Button size="large" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      )}
    </Screen>
  );
}

const Screen = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 20rem;
    height: auto;
    ${media.small} {
      width: 12rem;
    }
  }
  .message {
    padding-left: 1rem;
    padding-right: 1rem;

    font-size: 2.5rem;
    color: ${palette.gray8};
    margin-top: 2rem;
    ${media.small} {
      margin-top: 1rem;
    }
  }
  .button-wrapper {
    margin-top: 2rem;
    ${media.small} {
      margin-top: 1rem;
    }
  }
`;

export default ErrorScreenTemplate;

import React from 'react';
import styled from 'styled-components';
import { CheckIcon } from '../static/svg';
import palette from '../lib/styles/palette';
import Button from '../components/common/Button';
import { RouteComponentProps } from 'react-router-dom';
import media from '../lib/styles/media';
import qs from 'qs';

export type SuccessPageProps = {} & RouteComponentProps;

const messages = {
  unsubscribe_email:
    '이메일 구독이 해지되었습니다.\n설정에서 다시 활성화 할 수 있습니다.',
};

type MessageTypes = keyof typeof messages;

function SuccessPage({ history, location }: SuccessPageProps) {
  const { type } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as { type?: MessageTypes };

  const message = type ? messages[type] : '성공!';

  return (
    <Block>
      <CheckIcon />
      <div className="message">{message}</div>
      <div className="button-wrapper">
        <Button onClick={() => history.push('/')}>홈으로</Button>
      </div>
    </Block>
  );
}

const Block = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  svg {
    fill: ${palette.teal5};
    width: 5rem;
    height: 5rem;
  }
  .message {
    margin-top: 2rem;
    font-size: 1.5rem;
    white-space: pre;
    text-align: center;
    line-height: 1.5;
  }
  .button-wrapper {
    color: ${palette.gray8};
    margin-top: 1.5rem;
  }

  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
    .message {
      font-size: 1rem;
    }
  }
`;

export default SuccessPage;

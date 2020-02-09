import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import qs from 'qs';
import { emailCodeLogin } from '../../lib/api/auth';
import { GET_CURRENT_USER, CurrentUser } from '../../lib/graphql/user';
import storage from '../../lib/storage';
import { RootState } from '../../modules';
import { setUser } from '../../modules/core';
import { useApolloClient } from '@apollo/react-hooks';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { toast } from 'react-toastify';

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {
  setUser,
};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type EmailLoginProps = OwnProps &
  StateProps &
  DispatchProps &
  RouteComponentProps;

const { useEffect, useCallback } = React;

/**
 * Login with email code
 */
const EmailLogin: React.FC<EmailLoginProps> = ({ location, history }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const client = useApolloClient();
  const processLogin = useCallback(async () => {
    try {
      await emailCodeLogin(query.code);
      const response = await client.query<{ auth: CurrentUser }>({
        query: GET_CURRENT_USER,
        fetchPolicy: 'network-only',
      });

      storage.setItem('CURRENT_USER', response.data.auth);
      history.replace('/');
    } catch (e) {
      // TODO: show 401
      toast.error('잘못된 접근입니다.');
      history.replace('/');
    }
  }, [client, history, query.code]);
  useEffect(() => {
    if (!query.code) {
      // TODO: show 404
      toast.error('잘못된 접근입니다.');
      history.replace('/');
    }
    processLogin();
  }, [history, location.search, processLogin, query.code]);

  return (
    <Fullscreen>
      <SpinnerBlock>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </SpinnerBlock>
    </Fullscreen>
  );
};

const Fullscreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerBlock = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;

  .sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dot 2s infinite ease-in-out both;
  }

  .sk-chase-dot:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: ${palette.teal6};
    border-radius: 100%;
    animation: sk-chase-dot-before 2s infinite ease-in-out both;
  }

  .sk-chase-dot:nth-child(1) {
    animation-delay: -1.1s;
  }
  .sk-chase-dot:nth-child(2) {
    animation-delay: -1s;
  }
  .sk-chase-dot:nth-child(3) {
    animation-delay: -0.9s;
  }
  .sk-chase-dot:nth-child(4) {
    animation-delay: -0.8s;
  }
  .sk-chase-dot:nth-child(5) {
    animation-delay: -0.7s;
  }
  .sk-chase-dot:nth-child(6) {
    animation-delay: -0.6s;
  }
  .sk-chase-dot:nth-child(1):before {
    animation-delay: -1.1s;
  }
  .sk-chase-dot:nth-child(2):before {
    animation-delay: -1s;
  }
  .sk-chase-dot:nth-child(3):before {
    animation-delay: -0.9s;
  }
  .sk-chase-dot:nth-child(4):before {
    animation-delay: -0.8s;
  }
  .sk-chase-dot:nth-child(5):before {
    animation-delay: -0.7s;
  }
  .sk-chase-dot:nth-child(6):before {
    animation-delay: -0.6s;
  }

  @keyframes sk-chase {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }
`;

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EmailLogin));

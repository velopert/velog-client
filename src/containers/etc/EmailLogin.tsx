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
      history.replace('/');
    }
  }, [client, history, query.code]);
  useEffect(() => {
    if (!query.code) {
      // TODO: show 404
      history.replace('/');
    }
    processLogin();
  }, [history, location.search, processLogin, query.code]);
  return null;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EmailLogin));

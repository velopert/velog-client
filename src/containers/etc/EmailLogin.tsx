import React, { FC, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import qs from 'qs';
import { emailCodeLogin } from '../../lib/api/auth';
import client from '../../lib/graphql/client';
import { GET_CURRENT_USER, CurrentUser } from '../../lib/graphql/user';
import storage from '../../lib/storage';

interface EmailLoginProps extends RouteComponentProps<{}> {}

/**
 * Login with email code
 */
const EmailLogin: FC<EmailLoginProps> = props => {
  useEffect(() => {
    const query = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    });
    if (!query.code) {
      // TODO: show 404
      props.history.replace('/');
    }
    const fn = async () => {
      try {
        await emailCodeLogin(query.code);
        const response = await client.query<{ auth: CurrentUser }>({
          query: GET_CURRENT_USER,
        });
        storage.setItem('CURRENT_USER', response.data.auth);
        props.history.replace('/');
      } catch (e) {
        // TODO: show 401
        props.history.replace('/');
      }
    };
    fn();
  }, []);
  return null;
};

export default withRouter(EmailLogin);

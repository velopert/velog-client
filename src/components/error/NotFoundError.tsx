import React from 'react';
import ErrorScreenTemplate from './ErrorScreenTemplate';
import { undrawPageNotFound } from '../../static/images';
import { useHistory } from 'react-router-dom';
import StatusCode from '../common/StatusCode';
import useNotFound from '../../lib/hooks/useNotFound';
import { Helmet } from 'react-helmet-async';

export type NotFoundErrorProps = {};

function NotFoundError(props: NotFoundErrorProps) {
  const history = useHistory();
  const { reset } = useNotFound();

  return (
    <>
      <Helmet>
        <title>404 - velog</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <ErrorScreenTemplate
        image={undrawPageNotFound}
        message="아무것도 없네요!"
        buttonText="홈으로"
        onButtonClick={() => {
          history.push('/');
          reset();
        }}
      />
      <StatusCode statusCode={404} />
    </>
  );
}

export default NotFoundError;

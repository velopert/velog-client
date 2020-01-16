import React from 'react';
import NotFoundError from '../components/error/NotFoundError';

export type NotFoundPageProps = {};

function NotFoundPage(props: NotFoundPageProps) {
  return <NotFoundError />;
}

export default NotFoundPage;

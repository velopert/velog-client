import React from 'react';
import { Route } from 'react-router-dom';

export type StatusCodeProps = {
  statusCode: number;
};

function StatusCode({ statusCode }: StatusCodeProps) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.statusCode = statusCode;
        }
        return null;
      }}
    />
  );
}

export default StatusCode;

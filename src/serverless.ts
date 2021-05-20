import { APIGatewayEvent } from 'aws-lambda';
import serverRender from './server/serverRender';
import qs from 'qs';

export const handler = async (event: APIGatewayEvent) => {
  const query = event.queryStringParameters
    ? qs.stringify(event.queryStringParameters)
    : '';
  const url = query ? event.path.concat('?', query) : event.path;
  const cookie = event.headers.Cookie || '';
  const loggedIn =
    cookie.includes('refresh_token') || cookie.includes('access_token');

  if (event.path === 'ads.txt') {
    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8;',
      },
      body: 'google.com, pub-5574866530496701, DIRECT, f08c47fec0942fa0',
    };
  }

  try {
    const result = await serverRender({
      url,
      cookie,
      loggedIn,
    });
    if (!result) throw new Error('Result is null');

    const { html, statusCode } = result;

    return {
      statusCode: statusCode,
      headers: {
        'content-type': 'text/html; charset=utf-8;',
      },
      body: html,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: 'SSR has crashed',
        e,
      }),
    };
  }
};

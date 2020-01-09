import { APIGatewayEvent } from 'aws-lambda';
import serverRender from './server/serverRender';
import qs from 'qs';

export const handler = async (event: APIGatewayEvent) => {
  const query = event.queryStringParameters
    ? qs.stringify(event.queryStringParameters)
    : '';
  const url = event.path.concat(query);
  const cookie = event.headers.Cookie || '';
  const loggedIn =
    cookie.includes('refresh_token') || cookie.includes('access_token');

  try {
    const html = await serverRender({
      url,
      cookie,
      loggedIn,
    });
    return {
      statusCode: 200,
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

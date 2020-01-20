const axios = require('axios');
module.exports.webhook = async event => {
  if (
    event.queryStringParameters &&
    event.queryStringParameters.key !== process.env.SSR_DEPLOY_TOKEN
  ) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Invalid Key',
      }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing branch name',
      }),
    };
  }

  const parsedBody = JSON.parse(event.body);
  if (!['master'].includes(parsedBody.branch)) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: 'This branch cannot be deployed',
      }),
    };
  }

  try {
    await axios.post(
      'https://api.github.com/repos/velopert/velog-client/dispatches',
      {
        event_type: 'netlify-complete',
      },
      {
        headers: {
          Accept: 'application/vnd.github.everest-preview+json',
          Authorization: process.env.GITHUB_TOKEN,
        },
      },
    );

    return {
      statusCode: 204,
      body: '',
    };
  } catch (e) {
    console.log(e);
  }
};

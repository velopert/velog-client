const axios = require('axios');
const Redis = require('ioredis');

async function initiateGithubAction(body: any) {
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing branch name',
      }),
    };
  }

  const parsedBody = JSON.parse(body);
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
}

async function clearSSRCache() {
  const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
  });
  const keys = await redis.keys('ssr:*');
  await Promise.all(keys.map(key => redis.del(key)));
  redis.disconnect();
}

module.exports.webhook = async event => {
  if (!event.queryStringParameters) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Empty querystring',
      }),
    };
  }

  const { key, type } = event.queryStringParameters;

  if (key !== process.env.SSR_DEPLOY_TOKEN) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Invalid Key',
      }),
    };
  }

  if (type === 'netlify-complete') {
    return await initiateGithubAction(event.body);
  } else if (type === 'ssr-deploy-complete') {
    await clearSSRCache();
    return {
      statusCode: 204,
      body: '',
    };
  }
};

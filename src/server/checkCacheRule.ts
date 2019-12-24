import { pathToRegexp } from 'path-to-regexp';

const rules = [
  {
    path: '/',
    maxAge: 60 * 10,
  },
  {
    path: '/recent',
    maxAge: 60 * 5,
  },
  {
    path: '/trending',
    maxAge: 60 * 10,
  },
  {
    path: '/tags',
    maxAge: 60 * 10,
  },
  {
    path: '/tags/:tag',
    maxAge: 60 * 10,
  },
  {
    path: '/@:username',
    maxAge: 60 * 10,
  },
  {
    path: '/@:username/tags/:tag',
    maxAge: 60 * 10,
  },
  {
    path: '/@:username/:urlSlug',
    maxAge: 60 * 10,
  },
];

export default function checkCacheRule(url: string) {
  return rules.find(rule => pathToRegexp(rule.path).exec(url));
}

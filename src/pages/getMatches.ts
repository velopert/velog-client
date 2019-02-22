import { matchPath, RouteProps, match } from 'react-router';
import MainPage from './main/MainPage';

const config: RouteProps[] = [
  {
    path: '/',
    component: MainPage,
  },
];

export function getMatches(path: string) {
  return config
    .map(r => {
      const match = matchPath(path, r);
      if (!match) return null;
      return {
        match,
        component: r.component,
      };
    })
    .filter(Boolean);
}

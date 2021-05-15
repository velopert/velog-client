import { Timeframe } from '../../../modules/home';

export const timeframeMap: Record<Timeframe, string> = {
  day: '오늘',
  week: '이번 주',
  month: '이번 달',
  year: '올해',
};

export const timeframes = Object.entries(timeframeMap) as [Timeframe, string][];

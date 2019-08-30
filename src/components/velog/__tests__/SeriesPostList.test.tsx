import * as React from 'react';
import SeriesPostList, { SeriesPostListProps } from '../SeriesPostList';
import { seriesData } from '../../../lib/graphql/__data__/series.data';
import renderWithProviders from '../../../lib/renderWithProviders';

describe('SeriesPostList', () => {
  const setup = (props: Partial<SeriesPostListProps> = {}) => {
    const initialProps: SeriesPostListProps = {
      reversed: false,
      seriesPosts: seriesData.series.series_posts,
      username: 'velopert',
    };
    const utils = renderWithProviders(
      <SeriesPostList {...initialProps} {...props} />,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText } = setup();
    getByText('상태 관리 라이브러리의 미학: Redux 또는 MobX 를 통한 상태 관리');
    getByText('Redux (1) 소개 및 개념정리');
    getByText('Redux (2) 리액트 없이 쓰는 리덕스');
  });
  it('renders in order', () => {
    const { getByText } = setup();
    const first = getByText(
      '상태 관리 라이브러리의 미학: Redux 또는 MobX 를 통한 상태 관리',
    ).parentElement!.parentElement;
    const second = getByText('Redux (1) 소개 및 개념정리').parentElement!
      .parentElement;
    const third = getByText('Redux (2) 리액트 없이 쓰는 리덕스').parentElement!
      .parentElement;

    expect(second!.previousElementSibling).toBe(first);
    expect(second!.nextElementSibling).toBe(third);
  });
  it('renders reversly', () => {
    const { getByText } = setup({
      reversed: true,
    });
    const first = getByText(
      '상태 관리 라이브러리의 미학: Redux 또는 MobX 를 통한 상태 관리',
    ).parentElement!.parentElement;
    const second = getByText('Redux (1) 소개 및 개념정리').parentElement!
      .parentElement;
    const third = getByText('Redux (2) 리액트 없이 쓰는 리덕스').parentElement!
      .parentElement;

    expect(second!.previousElementSibling).toBe(third);
    expect(second!.nextElementSibling).toBe(first);
  });
});

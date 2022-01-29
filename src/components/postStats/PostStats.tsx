import React, { useMemo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SpinnerBlock from '../common/SpinnerBlock';
import { useQuery } from '@apollo/react-hooks';
import { GET_STATS, Stats } from '../../lib/graphql/post';
import { useParams } from 'react-router-dom';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import format from 'date-fns/format';
import { loadScript } from '../../lib/utils';

let promise = new Promise(() => {});

function loadChartJS() {
  return loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.1.1/echarts.min.js',
  );
}

function PostStats() {
  const params = useParams<{ postId: string }>();
  const { data } = useQuery<{ getStats: Stats }>(GET_STATS, {
    variables: {
      post_id: params.postId,
    },
  });

  const filledStats = useMemo(() => {
    if (!data) return null;
    const items = data.getStats.count_by_day;
    if (items.length < 2) return [];
    // make into map
    const countMap = new Map<string, number>();
    items.forEach((item) => {
      countMap.set(format(new Date(item.day), 'yyyy-MM-dd'), item.count);
    });

    const lastDate = new Date(items[0].day);
    const current = new Date(items[items.length - 1].day);

    const filled: { day: string; count: number }[] = [];
    while (current <= lastDate) {
      const formatted = format(current, 'yyyy-MM-dd');
      filled.push({
        day: formatted,
        count: countMap.get(formatted) ?? 0,
      });
      current.setDate(current.getDate() + 1);
    }

    return filled;
  }, [data]);

  // load chart js from cdn
  useEffect(() => {
    promise = loadChartJS();
  }, []);

  const chartBoxRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (!filledStats) return;

    promise
      .then(() => {
        const { echarts } = window;
        if (!chartBoxRef.current) return;
        if (!echarts) return;
        let option = {
          tooltip: {
            trigger: 'axis',
          },

          xAxis: {
            type: 'time',
            boundaryGap: false,
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '25%'],
          },
          dataZoom:
            filledStats.length > 30
              ? [
                  {
                    type: 'inside',
                    start: filledStats.length - 30,
                    end: filledStats.length,
                  },
                  {},
                ]
              : undefined,
          series: [
            {
              name: '조회수',
              type: 'line',
              smooth: false,
              data: filledStats.map((item) => [item.day, item.count]),
              symbol: 'none',
            },
          ],
          grid: {
            top: 32,
            left: 32,
            right: 8,
          },
        };

        const myChart =
          chartInstance.current ?? echarts.init(chartBoxRef.current);
        chartInstance.current = myChart;
        myChart.setOption(option);
      })
      .catch((e) => {
        console.error('Failed to load echarts', e);
      });
  }, [filledStats]);

  // handle chart responsive
  useEffect(() => {
    const handler = () => {
      if (!chartInstance.current) return;
      chartInstance.current.resize();
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  if (!data)
    return (
      <LoaderWrapper>
        <SpinnerBlock />
      </LoaderWrapper>
    );

  return (
    <Block>
      <Info>
        <Row>
          <span className="name">전체</span>
          <span className="value">{data.getStats.total.toLocaleString()}</span>
        </Row>
        <Row>
          <span className="name">오늘</span>
          <span className="value">
            {data.getStats.count_by_day[0]?.count ?? 0}
          </span>
        </Row>
        <Row>
          <span className="name">어제</span>
          <span className="value">
            {data.getStats.count_by_day[1]?.count ?? 0}
          </span>
        </Row>
      </Info>
      <ChartBox ref={chartBoxRef} />
    </Block>
  );
}

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 20rem;
  align-items: center;
  justify-content: center;
`;

const Block = styled.div``;

const Info = styled.div`
  background: ${themedPalette.bg_element2};
  padding: 1.5rem;
  border-radius: 0.5rem;
`;
const Row = styled.div`
  font-size: 1.5rem;

  line-height: 1.5;
  .name {
    color: ${themedPalette.text1};
    font-weight: bold;
  }
  .value {
    color: ${palette.gray7};
    margin-left: 1rem;
  }

  & + & {
    margin-top: 0.5rem;
  }
`;

const ChartBox = styled.div`
  width: 100%;
  height: 32rem;
  margin-top: 2rem;
`;

export default PostStats;

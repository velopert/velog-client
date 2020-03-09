import React from 'react';
import styled from 'styled-components';
import HomeWidget from './HomeWidget';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import Skeleton from '../common/Skeleton';

export type HomeTagWidgetProps = {
  tags: string[];
};

function HomeTagWidget({ tags }: HomeTagWidgetProps) {
  return (
    <StyledWidget title="인기 태그">
      <ul>
        {tags.map(tag => (
          <li key={tag}>
            <Link to={`/tags/${tag}`}># {tag}</Link>
          </li>
        ))}
        <li className="more">
          <Link to="/tags">더보기</Link>
        </li>
      </ul>
    </StyledWidget>
  );
}

export function HomeTagWidgetSkeleton() {
  return (
    <StyledWidget title="인기 태그">
      <ul>
        {[3, 7, 4, 6, 4, 3, 7, 5, 6, 3].map((width, index) => (
          <li key={index}>
            <Skeleton width={`${width}rem`} />
          </li>
        ))}
      </ul>
    </StyledWidget>
  );
}

const StyledWidget = styled(HomeWidget)`
  ul {
    list-style: none;
    padding-left: 0;
    a {
      cursor: pointer;
      color: inherit;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    li {
      color: ${palette.gray7};
      line-height: 1.5;
      font-size: 1rem;
    }
    li + li {
      margin-top: 0.25rem;
    }
    li.more {
      color: ${palette.gray6};
      a {
        &:hover {
          color: ${palette.gray5};
        }
        text-decoration: underline;
      }
    }
  }
`;

export default HomeTagWidget;

import React from 'react';
import styled from 'styled-components';
import MainWidget from './MainWidget';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

export type MainTagWidgetProps = {
  tags: string[];
};

function MainTagWidget({ tags }: MainTagWidgetProps) {
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

const StyledWidget = styled(MainWidget)`
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

export default MainTagWidget;

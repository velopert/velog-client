import * as React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import HomeWidget from './HomeWidget';
import { Link } from 'react-router-dom';
import { PartialPost } from '../../lib/graphql/post';
import { formatDate } from '../../lib/utils';
import Skeleton from '../common/Skeleton';

interface HomeNoticeWidgetProps {
  posts: PartialPost[];
}

const HomeNoticeWidget: React.FC<HomeNoticeWidgetProps> = ({ posts }) => {
  const sliced = posts.slice(0, 5);

  return (
    <StyledWidget title="공지사항">
      {posts.length === 0 && <div className="empty">공지사항이 없습니다.</div>}
      {posts.length > 0 && (
        <ul>
          {sliced.map((post) => (
            <li key={post.id}>
              <h5>
                <Link to={`/@velog/${post.url_slug}`}>{post.title}</Link>
              </h5>
              <div className="date">{formatDate(post.released_at)}</div>
            </li>
          ))}

          {posts.length === 6 && (
            <li className="more">
              <Link to="/@velog">더보기</Link>
            </li>
          )}
        </ul>
      )}
    </StyledWidget>
  );
};

export function HomeNoticeWidgetSkeleton() {
  return (
    <StyledWidget title="공지사항">
      <ul>
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index}>
            <h5>
              <Skeleton width="60%" />
            </h5>
            <div className="date">
              <Skeleton width="5rem" />
            </div>
          </li>
        ))}
      </ul>
    </StyledWidget>
  );
}

const StyledWidget = styled(HomeWidget)`
  .empty {
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: ${palette.gray5};
    text-align: center;
    font-size: 0.875rem;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      h5 {
        margin: 0;
        font-size: 1.125rem;
        line-height: 1.5;
        color: ${themedPalette.text1};
        a {
          text-decoration: none;
          color: inherit;
          &:hover {
            color: ${themedPalette.text2};
            text-decoration: underline;
          }
        }
      }
      .date {
        color: ${palette.gray6};
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }
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
    li + li {
      margin-top: 1rem;
    }
  }
`;

export default HomeNoticeWidget;

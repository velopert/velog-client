import * as React from 'react';
import styled from 'styled-components';
import VelogResponsive from '../velog/VelogResponsive';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import { SeriesPost } from '../../lib/graphql/post';
import PostSeriesInfo from './PostSeriesInfo';
import useToggle from '../../lib/hooks/useToggle';
import PopupOKCancel from '../common/PopupOKCancel';
import media from '../../lib/styles/media';
import TagList from '../common/TagList';
import { Link } from 'react-router-dom';

const PostHeadBlock = styled(VelogResponsive)`
  margin-top: 5.5rem;

  .head-wrapper {
    ${media.medium} {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  h1 {
    font-family: 'Spoqa Han Sans';
    font-size: 3rem;
    line-height: 1.5;
    letter-spacing: -0.02em;
    margin-top: 0;
    font-weight: 800;
    color: ${palette.gray8};
    margin-bottom: 2rem;
  }

  ${media.medium} {
    margin-top: 2rem;
    h1 {
      font-size: 2.25rem;
    }
  }
`;

const SubInfo = styled.div`
  align-items: center;
  font-size: 1rem;
  color: ${palette.gray7};
  font-family: 'Spoqa Han Sans';
  display: flex;
  justify-content: space-between;
  .information {
    .username {
      color: ${palette.gray8};
      font-weight: bold;
      a {
        color: inherit;
        text-decoration: none;
        &:hover {
          color: ${palette.gray7};
          text-decoration: underline;
        }
      }
    }
    .separator {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
    ${media.small} {
      font-size: 0.875rem;
    }
  }
  ${media.small} {
    margin-bottom: 0.75rem;
  }
`;

const EditRemoveGroup = styled.div`
  button {
    padding: 0;
    outline: none;
    border: none;
    background: none;
    font-size: inherit;
    cursor: pointer;
    color: ${palette.gray6};
    &:hover {
      color: ${palette.gray9};
    }
    ${media.small} {
      font-size: 0.875rem;
    }
  }
  button + button {
    margin-left: 0.5rem;
  }
`;

const Thumbnail = styled.img`
  max-height: 100vh;
  max-width: 100%;
  width: auto;
  margin: 0 auto;
  height: auto;
  object-fit: contain;
  display: block;
  margin-top: 2rem;
  ${media.small} {
    margin-top: 1.5rem;
  }
`;

export interface PostHeadProps {
  title: string;
  tags: string[];
  username: string;
  date: string;
  thumbnail: string | null;
  hideThumbnail: boolean;
  series: {
    id: string;
    name: string;
    url_slug: string;
    series_posts: SeriesPost[];
  } | null;
  postId: string;
  ownPost: boolean;
  onRemove: () => any;
  onEdit: () => any;
  shareButtons: React.ReactNode;
  toc: React.ReactNode;
}

const PostHead: React.FC<PostHeadProps> = ({
  title,
  username,
  date,
  tags,
  hideThumbnail,
  thumbnail,
  series,
  postId,
  ownPost,
  onRemove,
  onEdit,
  shareButtons,
  toc,
}) => {
  const [askRemove, toggleAskRemove] = useToggle(false);

  const onConfirmRemove = () => {
    toggleAskRemove();
    onRemove();
  };
  return (
    <PostHeadBlock>
      <div className="head-wrapper">
        <h1>{title}</h1>
        <SubInfo>
          <div className="information">
            <span className="username">
              <Link to={`/@${username}`}>{username}</Link>
            </span>
            <span className="separator">&middot;</span>
            <span>{formatDate(date)}</span>
          </div>
          {ownPost && (
            <EditRemoveGroup>
              <button onClick={onEdit}>수정</button>
              <button onClick={toggleAskRemove}>삭제</button>
            </EditRemoveGroup>
          )}
        </SubInfo>
        <TagList tags={tags} link />
        {shareButtons}
        {toc}
        {series && (
          <PostSeriesInfo
            name={series.name}
            posts={series.series_posts.map(sp => sp.post)}
            postId={postId}
            username={username}
            urlSlug={series.url_slug}
          />
        )}
      </div>
      {!hideThumbnail && thumbnail && (
        <Thumbnail src={thumbnail} alt="post-thumbnail" />
      )}
      <PopupOKCancel
        visible={askRemove}
        title="포스트 삭제"
        onCancel={toggleAskRemove}
        onConfirm={onConfirmRemove}
      >
        정말로 삭제하시겠습니까?
      </PopupOKCancel>
    </PostHeadBlock>
  );
};

export default PostHead;

import * as React from 'react';
import styled from 'styled-components';
import VelogResponsive from '../velog/VelogResponsive';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import { SeriesPost } from '../../lib/graphql/post';
import PostSeriesInfo from './PostSeriesInfo';
import useToggle from '../../lib/hooks/useToggle';
import PopupOKCancel from '../common/PopupOKCancel';
import media from '../../lib/styles/media';
import TagList from '../common/TagList';
import { Link } from 'react-router-dom';
import PrivatePostLabel from '../common/PrivatePostLabel';
import optimizeImage from '../../lib/optimizeImage';

const PostHeadBlock = styled(VelogResponsive)`
  margin-top: 5.5rem;

  .head-wrapper {
    ${media.medium} {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  h1 {
    /* font-family: 'Spoqa Han Sans'; */
    font-size: 3rem;
    line-height: 1.5;
    letter-spacing: -0.004em;
    margin-top: 0;
    font-weight: 800;
    color: ${themedPalette.text1};
    margin-bottom: 2rem;
    word-break: keep-all;
    transition: color 0.125s ease-in;
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
  color: ${themedPalette.text2};
  /* font-family: 'Spoqa Han Sans'; */
  display: flex;
  justify-content: space-between;
  .information {
    .username {
      color: ${themedPalette.text1};
      font-weight: bold;
      a {
        color: inherit;
        text-decoration: none;
        &:hover {
          color: ${themedPalette.text2};
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
  display: flex;
  justify-content: flex-end;
  margin-bottom: -1.25rem;
  ${media.medium} {
    margin-top: -0.5rem;
    margin-bottom: 1.5rem;
  }
  button {
    padding: 0;
    outline: none;
    border: none;
    background: none;
    font-size: inherit;
    cursor: pointer;
    color: ${themedPalette.text3};
    &:hover {
      color: ${themedPalette.text1};
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

const MobileOnly = styled.div`
  align-items: center;
  display: none;
  ${media.medium} {
    display: flex;
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
  isPrivate?: boolean;
  mobileLikeButton: React.ReactNode;
  onOpenStats(): void;
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
  isPrivate,
  mobileLikeButton,
  onOpenStats,
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
        {ownPost && (
          <EditRemoveGroup>
            <button onClick={onOpenStats}>통계</button>
            <button onClick={onEdit}>수정</button>
            <button onClick={toggleAskRemove}>삭제</button>
          </EditRemoveGroup>
        )}
        <SubInfo>
          <div className="information">
            <span className="username">
              <Link to={`/@${username}`}>{username}</Link>
            </span>
            <span className="separator">&middot;</span>
            <span>{formatDate(date)}</span>
            {isPrivate && (
              <>
                <span className="separator">&middot;</span>
                <PrivatePostLabel />
              </>
            )}
          </div>
          <MobileOnly>{mobileLikeButton}</MobileOnly>
        </SubInfo>
        <TagList tags={tags} link />
        {shareButtons}
        {toc}
        {series && (
          <PostSeriesInfo
            name={series.name}
            posts={series.series_posts.map((sp) => sp.post)}
            postId={postId}
            username={username}
            urlSlug={series.url_slug}
          />
        )}
      </div>
      {!hideThumbnail && thumbnail && (
        <Thumbnail
          src={optimizeImage(thumbnail)}
          alt="post-thumbnail"
          key={thumbnail}
        />
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

import * as React from 'react';
import styled from 'styled-components';
import VelogResponsive from '../velog/VelogResponsive';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import PostTags from './PostTags';
import { SeriesPost } from '../../lib/graphql/post';
import PostSeriesInfo from './PostSeriesInfo';
import useToggle from '../../lib/hooks/useToggle';
import PopupOKCancel from '../common/PopupOKCancel';

const PostHeadBlock = styled(VelogResponsive)`
  margin-top: 5.5rem;
  h1 {
    font-family: 'Spoqa Han Sans';
    font-size: 3rem;
    line-height: 1.25;
    letter-spacing: -0.02rem;
    margin-top: 0;
    font-weight: 800;
    color: ${palette.gray8};
    margin-bottom: 2rem;
  }
`;

const SubInfo = styled.div`
  font-size: 1rem;
  color: ${palette.gray7};
  font-family: 'Spoqa Han Sans';
  display: flex;
  justify-content: space-between;
  .information {
    .username {
      color: ${palette.gray8};
      font-weight: bold;
    }
    .separator {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
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
    series_posts: SeriesPost[];
  } | null;
  postId: string;
  ownPost: boolean;
  onRemove: () => any;
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
}) => {
  const [askRemove, toggleAskRemove] = useToggle(false);

  const onConfirmRemove = () => {
    toggleAskRemove();
    onRemove();
  };
  return (
    <PostHeadBlock>
      <h1>{title}</h1>
      <SubInfo>
        <div className="information">
          <span className="username">{username}</span>
          <span className="separator">&middot;</span>
          <span>{formatDate(date)}</span>
        </div>
        {ownPost && (
          <EditRemoveGroup>
            <button>수정</button>
            <button onClick={toggleAskRemove}>삭제</button>
          </EditRemoveGroup>
        )}
      </SubInfo>
      <PostTags tags={tags} />
      {series && (
        <PostSeriesInfo
          name={series.name}
          posts={series.series_posts.map(sp => sp.post)}
          postId={postId}
          username={username}
        />
      )}
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

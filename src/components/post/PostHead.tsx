import * as React from 'react';
import styled from 'styled-components';
import VelogResponsive from '../velog/VelogResponsive';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import PostTags from './PostTags';
import { SeriesPost } from '../../lib/graphql/post';
import PostSeriesInfo from './PostSeriesInfo';

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
  .username {
    color: ${palette.gray8};
    font-weight: bold;
  }
  .separator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
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
}) => {
  return (
    <PostHeadBlock>
      <h1>{title}</h1>
      <SubInfo>
        <span className="username">{username}</span>
        <span className="separator">&middot;</span>
        <span>{formatDate(date)}</span>
      </SubInfo>
      <PostTags tags={tags} />
      {series && (
        <PostSeriesInfo
          name={series.name}
          posts={series.series_posts.map(sp => sp.post)}
          postId={postId}
        />
      )}
      {!hideThumbnail && thumbnail && (
        <Thumbnail src={thumbnail} alt="post-thumbnail" />
      )}
    </PostHeadBlock>
  );
};

export default PostHead;

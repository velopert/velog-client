import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import { useQuery } from '@apollo/react-hooks';
import {
  GetRecommendedPostResponse,
  GET_RECOMMENDED_POST,
  PartialPost,
} from '../../lib/graphql/post';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import VelogResponsive from '../../components/velog/VelogResponsive';
import { userThumbnail } from '../../static/images';
import { Link } from 'react-router-dom';
import gtag from '../../lib/gtag';
import optimizeImage from '../../lib/optimizeImage';
import RelatedPostAd from './RelatedPostAd';
// import { detectAnyAdblocker } from 'just-detect-adblock';

function RelatedPostsForGuest({
  postId,
  showAds,
}: {
  postId: string;
  showAds: boolean;
}) {
  const { data } = useQuery<GetRecommendedPostResponse>(GET_RECOMMENDED_POST, {
    variables: {
      id: postId,
    },
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 519);
    const handler = () => {
      setIsMobile(window.innerWidth < 519);
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  const postsWithAds = useMemo(() => {
    if (!data?.post) return null;
    let sliced: (PartialPost | undefined)[] =
      data.post.recommended_posts.filter((post) => post.thumbnail);
    if (sliced.length < 6) {
      sliced = data.post.recommended_posts.slice(0, 6);
    } else {
      sliced = sliced.slice(0, 6);
    }
    if (!showAds) return sliced;

    const indexes = [
      [0, 5],
      [0, 4],
      [0, 2],
      [1, 3],
      [1, 5],
      [2, 4],
      [3, 5],
    ];

    const randomIndex = Math.floor(Math.random() * indexes.length);
    const [firstIndex, secondIndex] = indexes[randomIndex];
    sliced[firstIndex] = undefined;
    sliced[secondIndex] = undefined;
    return sliced;
  }, [data, showAds]);

  if (!postsWithAds) return null;

  if (isMobile) {
    return (
      <Wrapper>
        <h4>관심 있을 만한 포스트</h4>
        {postsWithAds.map((post, index) => {
          return post ? (
            <Row onClick={() => gtag('event', 'recommend_guest_click')}>
              <StyledRowLink
                to={`/@${post.user.username}/${post.url_slug}`}
                key={post.id ?? index}
              >
                <div className="left">
                  <div className="thumbnail-wrapper">
                    <img
                      src={optimizeImage(
                        post.thumbnail ??
                          post.user.profile.thumbnail ??
                          userThumbnail,
                        640,
                      )}
                      alt={post.title}
                    />
                  </div>
                </div>
                <div className="content">
                  <h5>{post.title}</h5>
                  <p>
                    {post.short_description.replace(/&#x3A;/g, ':')}
                    {post.short_description.length === 150 && '...'}
                  </p>
                </div>
              </StyledRowLink>
            </Row>
          ) : (
            <Row>
              <RelatedPostAd isMobile />
            </Row>
          );
        })}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h4>관심 있을 만한 포스트</h4>
      <Grid>
        {postsWithAds.map((post, index) =>
          post ? (
            <Item
              onClick={() => gtag('event', 'recommend_guest_click')}
              key={post.id ?? index}
            >
              <StyledLink to={`/@${post.user.username}/${post.url_slug}`}>
                <div className="thumbnail-wrapper">
                  <img
                    src={optimizeImage(
                      post.thumbnail ??
                        post.user.profile.thumbnail ??
                        userThumbnail,
                      640,
                    )}
                    alt={post.title}
                  />
                </div>
                <h5>{post.title}</h5>
              </StyledLink>
            </Item>
          ) : (
            <Item style={{ marginBottom: '-0.25rem' }}>
              <RelatedPostAd />
            </Item>
          ),
        )}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled(VelogResponsive)`
  h4 {
    font-size: 1.125rem;
    color: ${palette.gray8};
  }
  margin-top: 4rem;
  margin-bottom: 3rem;
  ${media.small} {
    flex-direction: column-reverse;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Grid = styled.div`
  margin-left: -1rem;
  margin-right: -1rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const Item = styled.div`
  position: relative;
  width: 33.333%;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 2rem;
  ${media.medium} {
    width: 50%;
    padding-bottom: 1rem;
  }

  .thumbnail-wrapper {
    width: 100%;
    padding-top: 52.35%;
    position: relative;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  h5 {
    height: 3rem;
    font-size: 1rem;
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    color: inherit;
    color: ${palette.gray8};
  }
`;

const Row = styled.div`
  & + & {
    margin-top: 0.5rem;
  }
`;
const StyledRowLink = styled(Link)`
  width: 100%;
  display: flex;
  text-decoration: none;
  color: inherit;
  display: flex;
  .left {
    width: 35%;
    margin-right: 0.5rem;
  }
  .thumbnail-wrapper {
    width: 100%;
    padding-top: 52.35%;
    position: relative;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .content {
    flex: 1;
    min-width: 0;
  }
  h5 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 0.75rem;
    color: ${palette.gray8};
    font-size: 0.75rem;

    line-height: 1.5;
  }

  p {
    margin: 0;
    font-size: 0.6875rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-height: 1.5;
    height: 2.0625rem;
    overflow: hidden;
    word-break: keep-all;
    color: ${palette.gray6};
    -webkit-box-orient: vertical;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
    color: ${palette.gray7};
  }
`;

export default RelatedPostsForGuest;

import React, { useMemo } from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import { useQuery } from '@apollo/react-hooks';
import {
  GetRecommendedPostResponse,
  GET_RECOMMENDED_POST,
  PartialPost,
} from '../../lib/graphql/post';
import palette from '../../lib/styles/palette';
import VelogResponsive from '../../components/velog/VelogResponsive';
import { userThumbnail } from '../../static/images';
import { Link } from 'react-router-dom';
import gtag from '../../lib/gtag';
import optimizeImage from '../../lib/optimizeImage';
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
      [2, 3],
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

  return (
    <Wrapper>
      <h4>관심 있을 만한 포스트</h4>
      <Grid>
        {postsWithAds.map((post) =>
          post ? (
            <Item onClick={() => gtag('event', 'recommend_guest_click')}>
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
            <Item>
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-format="fluid"
                data-ad-layout-key="-7p+de+1x+n+9"
                data-ad-client="ca-pub-5574866530496701"
                data-ad-slot="9497725960"
              ></ins>
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
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const Item = styled.div`
  position: relative;
  width: 33.333%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
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
